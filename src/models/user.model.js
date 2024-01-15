import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    password: { type: String, required: true },
    created_at: {
        type: Date,
        default: Date.now(),
    },
});

const User = mongoose.model("User", userSchema);
export default User;
