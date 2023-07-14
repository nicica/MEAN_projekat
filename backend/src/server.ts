import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import userRouter from './routers/user.routes';
import agencijaRouter from './routers/agencija.routes';
import objekatRouter from './routers/objekat.routes';

import zahtevRouter from './routers/zahtev.routes';
import ocenaRouter from './routers/ocene.routes';
import otkazRouter from './routers/otkaz.routes';




const app = express();
app.use(cors())
app.use(express.json())


mongoose.connect('mongodb://127.0.0.1:27017/baza')
const connection = mongoose.connection
connection.once('open', ()=>{
    console.log('db connected')
})



const router = express.Router();
router.use('/users', userRouter)
router.use('/agencija',agencijaRouter)
router.use('/objects',objekatRouter)
router.use('/zahtevi',zahtevRouter)
router.use('/ocene',ocenaRouter)
router.use('/otkazi',otkazRouter)


app.use('/', router)
app.listen(4000, () => console.log(`Express server running on port 4000`));