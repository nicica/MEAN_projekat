import express from 'express'
import { ZahtevController } from '../controllers/zahtev.controller';

const zahtevRouter = express.Router();

zahtevRouter.route('/newR').post(
    (req, res)=>new ZahtevController().newR(req, res)
)
zahtevRouter.route('/getAll').get(
    (req, res)=>new ZahtevController().getAll(req, res)
)
zahtevRouter.route('/delete').post(
    (req, res)=>new ZahtevController().delete(req, res)
)
zahtevRouter.route('/aktiviraj').post(
    (req, res)=>new ZahtevController().aktiviraj(req, res)
)
zahtevRouter.route('/pay').post(
    (req, res)=>new ZahtevController().plati(req, res)
)
zahtevRouter.route('/answer').post(
    (req, res)=>new ZahtevController().azuriraj(req, res)
)
zahtevRouter.route('/zavrsi').post(
    (req, res)=>new ZahtevController().zavrsi(req, res)
)
zahtevRouter.route('/otkazi').post(
    (req, res)=>new ZahtevController().otkazi(req, res)
)
export default zahtevRouter;