

import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Otkaz = new Schema({ 
    idPosla: {
        type: String
    },
    prihvacen: {
        type: Boolean
    }
})

export default mongoose.model('OtkazModel', Otkaz, 'otkazi')