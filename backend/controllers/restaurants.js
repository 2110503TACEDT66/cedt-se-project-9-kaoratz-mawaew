const User = require('../models/User');
const Restaurant = require('../models/Restaurant');
const Reservation = require('../models/Reservation');

// @desc Get all restaurant
// @route   GET /api/v1/restaurant
// @access  Public
exports.getRestaurants = async (req, res, next) => {
    let query;
    const reqQuery = { ...req.query };
    const removeFields = ['select', 'sort', 'page', 'limit'];

    removeFields.forEach(param => delete reqQuery[param]);

    let queryStr = JSON.stringify(reqQuery);

    // ex {"fields" : {"gt" : "$A"}}
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    query = Restaurant.find(JSON.parse(queryStr)).populate('reservation');

    if (req.query.select) {
        // { select: 'name,province,postalcode', sort: 'name' }
        const fields = req.query.select.split(',').join(' ');
        // name province postalcode
        query = query.select(fields);
    }

    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');

        query = query.sort(sortBy);
    } else {
        query = query.sort('-createdAt')
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
                limit
            }
        }

        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit
            }
        }

        res.status(200).json({
            success: true,
            count: restaurant.length,
            data: restaurant
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: 'Oh somthing went wrong! to getRestaurants.'
        });

        console.log(err.stack);
    }
};

//@desc Get single restaurant
// @route   GET /api/v1/restaurant/:id
// @access  Private
exports.getRestaurant = async (req, res, next) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);

        if (!restaurant) {
            return res.status(400).json({
                success: false,
                message: `No restaurant with the id of ${req.params.id}`
            });
        }

        res.status(200).json({
            success: true,
            data: restaurant
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: 'Oh somthing went wrong! to getRestaurant.'
        });
    }
};

//@desc Post single restaurant
//@route POST /api/v1/restaurant
//@access registered
exports.createRestaurant = async (req, res, next) => {
    const {name, district, province} = req.body;
    const mapUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${name + `,${district}` + `,${province}` + ',Thailand'}`;
    console.log(mapUrl);
    try {
        if (!req.body.manager && (req.user.role == 'manager' || req.user.role == 'admin')) {
            req.body.manager = req.user._id;
        }
        const response = await fetch (mapUrl);
        const data = await response.json();
        if(data.length > 0) {
            const {lat, lon} = data[0];
            const mapLink = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=18/${lat}/${lon}`;


            req.body.map = mapLink;
            const restaurant = await Restaurant.create(req.body);
            
            res.status(201).json({
                success: true,
                data: restaurant
            });
        }
        else {
            res.status(404).json({
            success: false,
            message: 'Location not found'});
        }
        
    } catch (err) {
        console.log(err.stack);
        res.status(400).json({
            success: false,
            message: 'Oh somthing went wrong! to createRestaurant.'
        });
    };
};

//@desc Update single restaurant
//@route PUT /api/v1/restaurant/:id
//@access registered
exports.updateRestaurant = async (req, res, next) => {
    try {
        const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!restaurant) {
            return res.status(400).json({
                success: false,
                message: `No restaurant with the id of ${req.params.id}`
            });
        }
        if (req.user.id != restaurant.manager && req.user.role == 'manager') {
            return res.status(400).json({
                success: false,
                message: 'You are not the manager of this restaurant'
            });
        }
        if(req.body.name && req.body.district && req.body.province){
            const {name, district, province} = req.body;
            const mapUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${name + `,${district}` + `,${province}` + ',Thailand'}`;
            const response = await fetch (mapUrl);
            const data = await response.json();
            if(data.length > 0) {
                const {lat, lon} = data[0];
                const mapLink = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=18/${lat}/${lon}`;
                req.body.map = mapLink;
        }
    }

        res.status(200).json({
            success: true,
            data: restaurant
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: 'Oh something went wrong to update restaurant.'
        });
    }
};

//@desc Delete single restaurant
//@route DELETE /api/v1/restaurant/:id
//@access registered
exports.deleteRestaurant = async (req, res, next) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);

        if (!restaurant) {
            return res.status(400).json({
                success: false,
                message: `No restaurant with the id of ${req.params.id}`
            });
        }
        if (req.user.id != restaurant.manager && req.user.role == 'manager') {
            return res.status(400).json({
                success: false,
                message: 'You are not the manager of this restaurant'
            });
        }

        await restaurant.deleteOne();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: 'Oh somthing went wrong! to deleteRestaurant.'
        });
    }
};

//@desc get restaurant that have the tag
//@route DELETE /api/v1/restaurant/:tag
//@access registered
exports.filterRestaurant = async (...tags) =>{
    try {
        const query = { tags: { $all: tags } };

        // Find restaurants matching the query
        const result = await Restaurant.find(query).toArray();

        res.status(200).json({
            success: true,
            data: result
        })
    }catch(err){
        console.log("something goes wrong")
        res.status(400).json({
            success: false,
            data: []
        })
    }
};
console.log("hello")