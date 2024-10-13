import { mongoose, Schema, model, models} from "mongoose";

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            trim: false,
        },
        parentId: {
            type: Schema.Types.ObjectId,
            ref: 'Category', // Reference to the Category model itself
            default: null, // Root categories will have no parent
        },
        isHide: {
            type: Boolean,
            default: false,
        },

    },
    {
        timestamps: true,
    }
);

const Category = models.Category || model('Category', categorySchema);
export default Category;