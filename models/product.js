import { Schema, model } from "mongoose";


const ProductSchema = Schema({

    name: {
        type: String,
        required: [true, 'name is required'],
        unique: true
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        //User Schema
        ref: 'User',
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    description: {
        type: String
    },
    available: {
        type: Boolean, default: true
    }

})

ProductSchema.methods.toJSON = function () {
    const { __v, state, ...data } = this.toObject();
    return data;
}

export default model('Product', ProductSchema);
