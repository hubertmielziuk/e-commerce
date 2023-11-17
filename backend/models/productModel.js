import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: String,
    price: {
        type: Number,
        required: true,
    },
    category: String,
    image: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
export const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;
