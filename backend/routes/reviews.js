const express = require('express');

const {getReviews, getReview, createReview, updateReview, deleteReview} = require('../controllers/reviews');

const paymentsRouter = require('./payments');
const router = express.Router({mergeParams: true});
 
const {protect, authorize} = require('../middleware/auth');
router.use('/:reservationId/payments/', paymentsRouter);

router.route('/').get(getReviews).post(protect, authorize('user','admin'), createReview);
router.route('/:id').get(protect, authorize('admin', 'user'), getReview).put(protect, authorize('user', 'admin'), updateReview).delete(protect, authorize('user', 'admin'), deleteReview);

module.exports = router;
