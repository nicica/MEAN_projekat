import express from 'express'
import { UserController } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.route('/login').post(
    (req, res)=>new UserController().login(req, res)
)
userRouter.route('/register').post(
    (req, res)=>new UserController().register(req, res)
)
userRouter.route('/changePass').post(
    (req, res)=>new UserController().changePass(req, res)
)
userRouter.route('/getAll').get(
    (req, res)=>new UserController().getAll(req, res)
)
userRouter.route('/confirmation').post(
    (req, res)=>new UserController().conf(req, res)
)
userRouter.route('/delete').post(
    (req, res)=>new UserController().delete(req, res)
)
userRouter.route('/registerAA').post(
    (req, res)=>new UserController().registerA(req, res)
)
userRouter.route('/updateD').post(
    (req, res)=>new UserController().updateD(req, res)
)
userRouter.route('/fPass').post(
    (req, res)=>new UserController().fPass(req, res)
)
export default userRouter;