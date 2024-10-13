import { Schema, model, models } from 'mongoose';

const adminSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: ["Admin", "SuperAdmin","Accoountant", "Manager","Editor", "Viewer"],
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});
const Admin = models.Admin || model('Admin', adminSchema);
export default Admin;