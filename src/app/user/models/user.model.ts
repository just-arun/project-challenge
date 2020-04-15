import {
   Schema,
   model 
} from 'mongoose'

export const UserModel = model("User", new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        required: true,
        type: String
    }
}));
