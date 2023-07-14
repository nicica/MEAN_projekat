import express from 'express'
import OcenaModel from '../models/ocene'
import mongoose from 'mongoose'
import { ObjectId } from 'mongodb'

export class OcenaController{

    
   
        nova = (req: express.Request, res: express.Response) =>{
            let ocena= new OcenaModel({
                komentar:req.body.komentar,
                ocena: req.body.ocena,
                idKomp: req.body.idAg,
                imeKor: req.body.ime,
                prezKor: req.body.prezime,
                idPos: req.body.idPos

            })
            ocena.save((err, resp)=>{
                if(err) {
                    res.status(400).json({"message": "error"})
                }
                else res.json({"message": "ok"})
            })
        }
        getAll = (req: express.Request, res: express.Response)=>{
            OcenaModel.find({}, (err, ags)=>{
                if(err) console.log(err)
                else res.json(ags)
            })
        }
        promena = (req: express.Request, res: express.Response) =>{
            
            OcenaModel.updateOne({"_id":new ObjectId(req.body.id)},{'komentar':req.body.komentar,'ocena':req.body.ocena}, (err, ags)=>{
                if(err) console.log(err)
                else res.json(ags)
            })
        }
}
