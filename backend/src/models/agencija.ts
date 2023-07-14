
import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Agencija = new Schema({ 
    
    id: {
        type: Number
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    imejl: {
        type: String
    },
    aName: {
        type: String
    },
    address: {
        type: String
    },
    phoneNum: {
        type: String
    },
    matNum: {
        type: String
    },
    desc: {
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

export default mongoose.model('AgencijaModel', Agencija, 'agencija')