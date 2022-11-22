import { Schema, model } from "mongoose";


const CategorySchema = Schema({
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
    }
})

CategorySchema.methods.toJSON = function () {
    const { __v, state, ...data } = this.toObject();
    return data;
}



export default model('Category', CategorySchema);


