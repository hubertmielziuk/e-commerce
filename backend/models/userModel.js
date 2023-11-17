import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: String,
    lastName: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
export const UserModel = mongoose.model("User", userSchema);
export default UserModel;
