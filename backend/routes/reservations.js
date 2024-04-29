const express = require("express");

const {
  getReservations,
  getReservation,
  createReservation,
  updateReservation,
  deleteReservation,
  getSummaryReservation,
  getRestaurantReservation,
} = require("../controllers/reservations");

const paymentsRouter = require("./payments");
const router = express.Router({ mergeParams: true });

const { protect, authorize } = require("../middleware/auth");
router.use("/:reservationId/payments/", paymentsRouter);


router
  .route("/")
  .get(protect, authorize("admin", "user", "manager"), getReservations)
  .post(protect, authorize("user", "admin", "manager"), createReservation);
router.route("/restaurantinfo").get(protect, authorize("admin", "manager"), getRestaurantReservation);
router
  .route("/:id")
  .get(protect, authorize("admin", "user", "manager"), getReservation)
  .put(protect, authorize("user", "admin", "manager"), updateReservation)
  .delete(protect, authorize("user", "admin", "manager"), deleteReservation);
router
  .route("/:restaurantId/summary")
  .get(getSummaryReservation);

module.exports = router;