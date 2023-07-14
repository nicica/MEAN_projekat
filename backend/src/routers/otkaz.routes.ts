import express from 'express'
import { OtkazController } from '../controllers/otkaz.controller';

const otkazRouter = express.Router();

otkazRouter.route('/dodaj').post(
    (req, res)=>new OtkazController().dodaj(req, res)
)
otkazRouter.route('/getAll').get(
    (req, res)=>new OtkazController().getAll(req, res)
)
otkazRouter.route('/promena').post(
    (req, res)=>new OtkazController().promena(req, res)
)
export default otkazRouter;