const Restaurant = require("../models/Restaurant");
const Reservation = require("../models/Reservation");
const Review = require("../models/Review");

// @desc    Get all review
// @route   GET /api/v1/restaurants
// @access  Public
exports.getReviews = async (req, res, next) => {
  let query;
  const reqQuery = { ...req.query };
  const removeFields = ["select", "sort", "page", "limit", "tag"]; // remove redundancies

  removeFields.forEach((param) => delete reqQuery[param]);

  let queryStr = JSON.stringify(reqQuery);

  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );
  query = Review.find(JSON.parse(queryStr));

  if (req.query.rating) {
    const rating = req.query.tag.split(",");

    query = query.find({ tag: { $in: rating } }); // union approach
  } else if (req.query.user) {
    const userId = req.query.user;
    query = query.find({ user: userId });
  }
  //all see all
  else if (req.params.restaurantId) {
    query = Review.find({ restaurant: req.params.restaurantId })
      .populate({
        path: "restaurant",
        select: "name province tel",
      })
      .populate({
        path: "user",
        select: "name",
      });
  } else {
    query = Review.find()
      .populate({
        path: "restaurant",
        select: "name province tel",
      })
      .populate({
        path: "user",
        select: "name",
      });
  }

  //handle dashboard

  try {
    const review = await query;

    res.status(200).json({
      success: true,
      count: review.length,
      data: review,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "Server error",
    });

    console.log(err);
  }
};

// @desc get one reservation
// @route GET /api/v1/reservations/:id
// @access registered
exports.getReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate({
        path: "restaurant",
        select: "name province tel",
      })
      .populate({
        path: "user",
        select: "name",
      });

    if (!review) {
      return res
        .status(404)
        .json({
          success: false,
          msg: `No review with the id of ${req.params.id}`,
        });
    }

    res.status(200).json({
      success: true,
      data: review,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      msg: "Cannot find review",
    });
  }
};

// @desc Post single reservation
// @route POST /api/v1/restaurants/:id
// @access registered
exports.createReview = async (req, res, next) => {
  try {
    req.body.restaurant = req.params.restaurantId;
    const restaurant = await Restaurant.findById(req.params.restaurantId);
    req.body.user = req.user.id;
    req.body.name = req.user.name;
    const existedReservation = await Reservation.find({
      user: req.user.id,
      restaurant: restaurant,
      completed: true,
    });

    if (existedReservation.length < 1 && req.user.role !== "admin") {
      return res.status(400).json({
        success: false,
        msg: `The user with user id ${req.user.id} has not tried this restaurant yet!`,
      });
    }

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        msg: `No restaurant with the id ${req.params.restaurantId}`,
      });
    }
    if (req.body.rating > 5) {
      return res.status(400).json({
        success: false,
        msg: "Rating cannot exceed 5",
      });
    }
    if (req.body.rating < 0) {
      return res.status(400).json({
        success: false,
        msg: "Rating cannot lower than 0",
      });
    }
    const review = await Review.create(req.body);

    res.status(201).json({
      success: true,
      data: review,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Cannot create review",
    });
  }
};

// @desc update one reservation
// @route
// @access
exports.updateReview = async (req, res, next) => {
  try {
    let review = await Review.findById(req.params.id);

    //make sure is update by owner
    if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(400).json({
        success: false,
        msg: `User ${req.user.id} is not authorized to update this review`,
      });
    }

    if (!review) {
      return res.status(404).json({
        success: false,
        msg: `No review with the id of ${req.params.id}`,
      });
    }

    review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      data: review,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      msg: "Could not update review",
    });
  }
};

// @desc Delete one reservation
// @route DELETE /api/v1/reservations/:id
// @access registered
exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(400).json({
        success: false,
        msg: `User ${req.user.id} is not authorized to delete this review`,
      });
    }

    if (!review) {
      return res.status(404).json({
        success: false,
        msg: `No review with id of ${req.params.id}`,
      });
    }

    await review.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "Could not delete review",
    });

    console.log(err);
  }
};

exports.getDashboardReviews = async (req, res, next) => {
  if (req.user.role == "manager" || req.user.role == "admin") {
    try {
      // Find restaurants with the matching manager ID
      const restaurants = await Restaurant.find({ manager: req.user.id });

      // Map over each restaurant to get its reviews
      const reviewsPromises = restaurants.map(async (restaurant) => {
        const reviews = await Review.find({ restaurant: restaurant._id });
        return reviews;
      });

      // Wait for all reviews to be fetched for each restaurant
      const allReviews = await Promise.all(reviewsPromises);
      const reviewsData = allReviews.flat();

      res.status(200).json({
        success: true,
        count: reviewsData.length,
        data: reviewsData,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        msg: "Failed to fetch reviews",
      });
    }
  }
};
