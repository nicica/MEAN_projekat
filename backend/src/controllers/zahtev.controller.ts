import express from 'express'
import ZahtevModel from '../models/zahtev'
import mongoose from 'mongoose'
import { ObjectId } from 'mongodb'

export class ZahtevController{

    
   
        newR = (req: express.Request, res: express.Response) =>{
            let zahtev= new ZahtevModel({
                idObjekat: req.body.id,
                agencyUsr: req.body.username,
                agencyName: req.body.agencyName,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                phase: req.body.phase,
                ownerUsr: req.body.usernameIs,
                placen: req.body.placen,
                nadoknada: null


            })
            zahtev.save((err, resp)=>{
                if(err) {
                    res.status(400).json({"message": "error"})
                }
                else res.json({"message": "ok"})
            })
        }
        getAll = (req: express.Request, res: express.Response)=>{
            ZahtevModel.find({}, (err, ags)=>{
                if(err) console.log(err)
                else res.json(ags)
            })
        }
        delete = (req: express.Request, res: express.Response)=>{
            ZahtevModel.deleteOne({"_id":new ObjectId(req.body.id)}, (err, ags)=>{
                if(err) console.log(err)
                else res.json(ags)
            })
        }
        aktiviraj = (req: express.Request, res: express.Response)=>{
            ZahtevModel.updateOne({"_id":new ObjectId(req.body.id)},{'phase':'aktivan'}, (err, ags)=>{
                if(err) console.log(err)
                else res.json(ags)
            })
        }
        plati = (req: express.Request, res: express.Response)=>{
            ZahtevModel.updateOne({"_id":new ObjectId(req.body.id)},{'placen':true}, (err, ags)=>{
                if(err) console.log(err)
                else res.json(ags)
            })
        }
        azuriraj = (req: express.Request, res: express.Response)=>{
            ZahtevModel.updateOne({"_id":new ObjectId(req.body.id)},{'phase':req.body.st, 'nadoknada':req.body.suma}, (err, ags)=>{
                if(err) console.log(err)
                else res.json(ags)
            })
        }
        zavrsi = (req: express.Request, res: express.Response)=>{
            console.log("here")
            ZahtevModel.updateOne({"_id":new ObjectId(req.body.id)},{'phase':'zavrsen'}, (err, ags)=>{
                if(err) console.log(err)
                else res.json(ags)
            })
        }
        otkazi = (req: express.Request, res: express.Response)=>{
            ZahtevModel.updateOne({"_id":new ObjectId(req.body.id)},{'phase':'otkazan'}, (err, ags)=>{
                if(err) console.log(err)
                else res.json(ags)
            })
        }

}