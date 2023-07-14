

import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Ocena = new Schema({ 
    idKomp: {
        type: String
    },
    imeKor: {
        type: String
    },
    prezKor: {
        type: String
    },
    ocena: {
        type: Number
    },
    komentar:{
        type: String
    },
    idPos:{
        type: String
    }

})

export default mongoose.model('OcenaModel', Ocena, 'ocene')