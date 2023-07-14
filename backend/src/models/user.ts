
import mongoose from "mongoose";

const Schema = mongoose.Schema;

let User = new Schema({ 
    
    id: {
        type: Number
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    phoneNum: {
        type: String
    },
    imejl: {
        type: String
    },
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    tip:{
        type: String
    },
    pic:{
        type: String
    },
    odobren:{
        type: Boolean
    }

})

export default mongoose.model('UserModel', User, 'agencija')