const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    resvDate: {
        type: Date,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    restaurant: {
        type: mongoose.Schema.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    createdAt: {
        type: Date, 
        default: Date.now
    },
    completed: {
        type: Boolean,
        default: false
    }

});

ReservationSchema.pre('save' , function(next) {
    if (this.resvDate < new Date()) {
        this.completed = true;
    }
    next();
});

module.exports = mongoose.model('Reservation', ReservationSchema);
