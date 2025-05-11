const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    product: {
        type: Object,
        required: true,
    },  
    qty: {
        type: Number,
        required: true,
        default: 1,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}   , { timestamps: true });


module.exports=mongoose.model('cart',cartSchema);
