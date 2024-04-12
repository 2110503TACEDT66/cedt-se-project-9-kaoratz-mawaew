const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
        unique: false,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    subdistrict: {
        type: String,
        required: [true, 'Please add a subdistrict']
    },
    district: {
        type: String,
        required: [true, 'Please add a district']
    },
    province: {
        type: String,
        required: [true, 'Please add a province']
    },
    postalcode: {
        type: String,
        required: [true, 'Please add a postal code'],
        maxlength: [5, 'Postal code can not be more than 5 digits']
    },
    region: {
        type: String,
        required: [true, 'Please add a region']
    },
    tel: {
        type: String
    },
    opentime: {
        type: String,
        required: [true, 'Please add a Open Time'],
        minlength: 5,
        maxlength: [5, 'Please label time in 24hr system']
    },
    closetime: {
        type: String,
        required: [true, 'Please add a Close Time'],
        minlength: 5,
        maxlength: [5, 'Please label time in 24hr system']
    },
    imageUrl: {
        type: String,
        required: true
    },
    map : {
        type: String,
        required: true
    },
    tag: {
        type: [String],
        required: true
    },
    manager: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

RestaurantSchema.index({name: 1, address: 1, subdistrict: 1, district: 1, province: 1}, {unique: true});

//Cascade delete reservation when a Restaurant is deleted
RestaurantSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    console.log(`Reservation being removed from restaurant ${this._id}`);
    await this.model('Reservation').deleteMany({ restaurant: this._id });
    next();
});


//Reverse populate with virtuals
RestaurantSchema.virtual('reservation', {
    ref: 'Reservation',
    localField: '_id',
    foreignField: 'restaurant',
    justOne: false
});


module.exports = mongoose.model('Restaurant', RestaurantSchema);