import express from 'express'
import { OcenaController } from '../controllers/ocene.controller';

const ocenaRouter = express.Router();

ocenaRouter.route('/nova').post(
    (req, res)=>new OcenaController().nova(req, res)
)
ocenaRouter.route('/getAll').get(
    (req, res)=>new OcenaController().getAll(req, res)
)
ocenaRouter.route('/promena').post(
    (req, res)=>new OcenaController().promena(req, res)
)
export default ocenaRouter;