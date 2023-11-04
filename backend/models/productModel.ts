import mongoose from "mongoose";

interface IProduct extends Document {
  name: string;
  description?: string;
  price: number;
  category: string;
  image: string;
  createdAt: Date;
}

const productSchema = new mongoose.Schema<IProduct>({
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

export const ProductModel = mongoose.model<IProduct>("Product", productSchema);
export default ProductModel;
