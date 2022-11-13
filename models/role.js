import { Schema, model } from "mongoose";


const RoleSchema = Schema({
    rol: {
        type: String,
        required: [true, 'Role is required']
    }
})


export default model('Role', RoleSchema); 






