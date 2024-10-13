import mongoose, { Schema, model, models } from 'mongoose';

// Define the user schema
const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            default: 'user'
        }
    },
    {
        timestamps: true  // Automatically adds createdAt and updatedAt fields
    }
);

// Fix: ensure 'models' is properly accessed and user model is created only if it doesn't exist
const User = models?.User || model('User', userSchema); 

export default User;
