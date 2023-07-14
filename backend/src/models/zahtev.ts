

import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Zahtev = new Schema({ 
    idObjekat: {
        type: String
    },
    agencyUsr: {
        type: String
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    phase:{
        type: String
    },
    agencyName:{
        type: String
    },
    ownerUsr:{
        type:String
    },
    placen:{
        type:Boolean
    },
    nadoknada:{
        type:Number
    }

})

export default mongoose.model('ZahtevModel', Zahtev, 'zahtevi')