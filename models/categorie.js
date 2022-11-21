import { Schema, model } from "mongoose";


const CategorieSchema = Schema({
    name: {
        type: String,
        required: [true, 'name is required']
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


export default model('Categorie', CategorieSchema);


