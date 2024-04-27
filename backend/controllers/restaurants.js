const User = require("../models/User");
const Restaurant = require("../models/Restaurant");
const Reservation = require("../models/Reservation");

// @desc Get all restaurant
// @route   GET /api/v1/restaurant
// @access  Public
exports.getRestaurants = async (req, res, next) => {
  let query;
  const reqQuery = { ...req.query };
  const removeFields = ["select", "sort", "page", "limit", "tag"]; // remove redundancies

  removeFields.forEach((param) => delete reqQuery[param]);

  let queryStr = JSON.stringify(reqQuery);

  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );
  query = Restaurant.find(JSON.parse(queryStr)).populate({
    path: 'reservation',
    select: 'resvDate user'
  }).populate({
    path: 'manager',
    select: 'name tel email role'
  });

  if (req.query.tag) {
    const tags = req.query.tag.split(",");

    query = query.find({ tag: { $in: tags } }); // union approach
  }

  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");

    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  try {
    const total = Restaurant.countDocuments;

    query = query.skip(startIndex).limit(limit);

    const restaurant = await query;

    const pagination = {};

    if (endIndex < total) {
      pagination.new = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    res.status(200).json({
      success: true,
      count: restaurant.length,
      data: restaurant,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Oh somthing went wrong! to getRestaurants.",
    });

    console.log(err.stack);
  }
};

// @desc Get single restaurant
// @route   GET /api/v1/restaurant/:id
// @access  Private
exports.getRestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).populate({
      path: 'reservation',
      select: 'resvDate user'
    });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: `No restaurant with the id of ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: restaurant,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Oh somthing went wrong! to getRestaurant.",
    });
  }
};

// @desc Post single restaurant
// @route POST /api/v1/restaurant
// @access registered
exports.createRestaurant = async (req, res, next) => {
  try {
    if (
      !req.body.manager &&
      (req.user.role == "manager" || req.user.role == "admin")
    ) {
      req.body.manager = req.user.id;
    }

    const tags = req.body.tag.split(",");
    req.body.tag = tags;

    const restaurant = await Restaurant.create(req.body);

    res.status(201).json({
      success: true,
      data: restaurant,
    });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({
      success: false,
      message: "Oh somthing went wrong! to createRestaurant.",
    });
  }
};

// @desc Update single restaurant
// @route PUT /api/v1/restaurant/:id
// @access registered
exports.updateRestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: `No restaurant with the id of ${req.params.id}`,
      });
    }
    if (req.user.id != restaurant.manager && req.user.role == "manager") {
      return res.status(400).json({
        success: false,
        message: "You are not the manager of this restaurant",
      });
    }
    if (
      req.body.name &&
      req.body.address &&
      req.body.subdistrict &&
      req.body.district &&
      req.body.province
    ) {
      const { name, address, subdistrict, district, province } = req.body;
      const mapUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${
        name +
        `,${address}` +
        `,${subdistrict}` +
        `,${district}` +
        `,${province}` +
        ",Thailand"
      }`;
      const response = await fetch(mapUrl);
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        const mapLink = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=18/${lat}/${lon}`;
        req.body.map = mapLink;
      } else {
        res.status(404).json({
          success: false,
          message: "Location not found",
        });
      }
    }
    await Restaurant.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: restaurant,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Oh something went wrong to update restaurant.",
    });
  }
};

// @desc Delete single restaurant
// @route DELETE /api/v1/restaurant/:id
// @access registered
exports.deleteRestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(400).json({
        success: false,
        message: `No restaurant with the id of ${req.params.id}`,
      });
    }
    if (req.user.id != restaurant.manager && req.user.role == "manager") {
      return res.status(400).json({
        success: false,
        message: "You are not the manager of this restaurant",
      });
    }

    await restaurant.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Oh somthing went wrong! to deleteRestaurant.",
    });
  }
};

// @desc get restaurant that have the tag
// @route DELETE /api/v1/restaurant/filter
// @access registered
exports.filterRestaurant = async (req, res) => {
  const { tags } = req.query.tag;

  if (!tags) {
    return res.status(404).json({ error: "Tags parameter is required" });
  }
  try {
    const tagsArray = tags.split(",");

    Restaurant.find({ tags: { $in: tagsArray } })
      .then((restaurants) => {
        // Send the results back to the client
        res.json(restaurants);
      })
      .catch((err) => {
        // Handle error
        console.error("Error querying database:", err);
        res.status(500).json({ error: "Internal Server Error" });
      });

    res.status(400).json(filteredRestaurants);
  } catch (err) {
    console.log(err);
  }
};
