import express from 'express'
import { AgencijaController } from '../controllers/agencija.controller';

const agencijaRouter = express.Router();

agencijaRouter.route('/login').post(
    (req, res)=>new AgencijaController().login(req, res)
)
agencijaRouter.route('/register').post(
    (req, res)=>new AgencijaController().register(req, res)
)
agencijaRouter.route('/changePass').post(
    (req, res)=>new AgencijaController().changePass(req, res)
)
agencijaRouter.route('/getAllAgencije').get(
    (req, res)=>new AgencijaController().getAllAgencije(req, res)
)
agencijaRouter.route('/delete').post(
    (req, res)=>new AgencijaController().delete(req, res)
)
agencijaRouter.route('/confirmation').post(
    (req, res)=>new AgencijaController().conf(req, res)
)
agencijaRouter.route('/registerAA').post(
    (req, res)=>new AgencijaController().registerA(req, res)
)
agencijaRouter.route('/updateD').post(
    (req, res)=>new AgencijaController().updateD(req, res)
)
agencijaRouter.route('/fPass').post(
    (req, res)=>new AgencijaController().fPass(req, res)
)
export default agencijaRouter;