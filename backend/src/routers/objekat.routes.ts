import express from 'express'
import { ObjekatController } from '../controllers/objekat.controller';

const objekatRouter = express.Router();

objekatRouter.route('/save').post(
    (req, res)=>new ObjekatController().save(req, res)
)
objekatRouter.route('/getAllObjects').get(
    (req, res)=>new ObjekatController().getAllObjekti(req, res)
)
objekatRouter.route('/deleteObject').post(
    (req, res)=>new ObjekatController().delete(req, res)
)
objekatRouter.route('/changeInfo').post(
    (req, res)=>new ObjekatController().change(req, res)
)
objekatRouter.route('/ren').post(
    (req, res)=>new ObjekatController().upgrade(req, res)
)
export default objekatRouter;