const express = require('express');
const {getRestaurants, getRestaurant, createRestaurant, updateRestaurant, deleteRestaurant} = require('../controllers/restaurants');

//Include other resource routers
const reservationRouter = require('./reservations');

const router = express.Router();
const {protect,authorize} = require('../middleware/auth');

//Re-route into other resource routers
router.use('/:restaurantId/reservations', reservationRouter);

router.route('/').get(getRestaurants).post(protect, authorize('admin', 'manager'), createRestaurant);
router.route('/:id').get(getRestaurant).put(protect, authorize('admin', 'manager'), updateRestaurant).delete(protect, authorize('admin', 'manager'), deleteRestaurant);

module.exports = router;