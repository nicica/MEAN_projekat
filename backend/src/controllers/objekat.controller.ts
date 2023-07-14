import express from 'express'
import ObjekatModel from '../models/objekat'
import mongoose from 'mongoose'
import { ObjectId } from 'mongodb'
import { parse } from 'path'
const fs=require('fs')
const path= require('path')
export class ObjekatController{
    save = (req: express.Request, res: express.Response)=>{
        let objekat = new ObjekatModel({
            tip: req.body.tip,
            address: req.body.address,
            numR: req.body.numR,
            size: req.body.size,
            owner: req.body.owner,
            skica: "assets/skice/"+ req.body.skica
        })
        const towrite= path.join(__dirname,"../../../frontend/src/assets/skice")
        const filepath = path.join(towrite,req.body.skica)
        fs.writeFile((filepath),req.body.skicaData, () => {
             
        });

        objekat.save((err, resp)=>{
            if(err) {
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
        

        
    }
    getAllObjekti = (req: express.Request, res: express.Response)=>{
        ObjekatModel.find({}, (err, ags)=>{
            if(err) console.log(err)
            else res.json(ags)
        })
    }
    delete = (req: express.Request, res: express.Response)=>{
        ObjekatModel.deleteOne({"_id": new ObjectId(req.body.id) },(err,ags)=>{
            if(err) console.log(err)
            else res.json(ags)
        })
    }
    change=(req: express.Request, res: express.Response)=>{
        
        let data ={
            tip: req.body.tip,
            address: req.body.address,
            size: req.body.size,
            numR: req.body.numR
        }
        const towrite= path.join(__dirname,"../../../frontend/src/assets/skice")
        const filepath = path.join(towrite,req.body.skica)
        fs.writeFile((filepath),req.body.content, () => {
             
        });
        ObjekatModel.updateOne({"_id": new ObjectId(req.body.id) },{$set:data}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })

    }
    upgrade=(req: express.Request, res: express.Response)=>{
        
        
        const towrite= path.join(__dirname,"../../../frontend/src/assets/skice")
        const filepath = path.join(towrite,req.body.skica)
        fs.writeFile((filepath),req.body.content, () => {
             
        });
       
        

    }
}