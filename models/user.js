import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        lastname: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            min: 5,
            max: 50,
        },
        picturepath: {
            type: String,
            default: "",
        },
        friends: { 
            type: Array,
            default: [],
        },
        location: String,
        occupation: String,
        viewedprofile: { type: Number, default: 0 }, 
        impressions: { type: Number, default: 0 },
    },
    { timestamps: true } 
);

// Correct model definition
const User = mongoose.model("User", userSchema); 

export default User;
