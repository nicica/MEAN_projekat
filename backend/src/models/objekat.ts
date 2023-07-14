
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Objekat = new Schema({ 
    tip: {
        type: String
    },
    address: {
        type: String
    },
    numR: {
        type: Number
    },
    size: {
        type: Number
    },
    owner:{
        type: String
    },
    skica:{
        type: String
    }

})

export default mongoose.model('ObjekatModel', Objekat, 'objects')