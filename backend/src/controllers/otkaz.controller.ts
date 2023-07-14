import express from 'express'
import OtkazModel from '../models/otkaz'
import ZahtevModel from '../models/zahtev'
import mongoose from 'mongoose'
import { ObjectId } from 'mongodb'
import { ZahtevController } from './zahtev.controller'

export class OtkazController{

    
   
        dodaj = (req: express.Request, res: express.Response) =>{
            let ocena= new OtkazModel({
                idPosla: req.body.id,
                prihvacen: null

            })
            ocena.save((err, resp)=>{
                if(err) {
                    res.status(400).json({"message": "error"})
                }
                else res.json({"message": "ok"})
            })
        }
        getAll = (req: express.Request, res: express.Response)=>{
            
            OtkazModel.find({}, (err, ags)=>{
                if(err) console.log(err)
                else res.json(ags)
            })
        }
        promena = (req: express.Request, res: express.Response) =>{
            
            OtkazModel.updateOne({"_id":new ObjectId(req.body.id)},{'prihvacen':req.body.odg}, (err, ags)=>{
                if(err) console.log(err)
                else {
                    
                    res.json(ags)}
            })
        }
}
