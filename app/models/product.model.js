import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: String,
        required: true,
        enum: ['Electronics', 'Clothing', 'Books', 'Home', 'Grocery', 'Other'],
    },
    brand: {
        type: String,
        default: 'Generic',
    },
    stock: {
        type: Number,
        default: 0,
        min: 0,
    },
    ratings: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    discount: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
    }

}, { timestamps: true });

export default mongoose.model('Product', productSchema);