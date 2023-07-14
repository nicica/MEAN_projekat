import express from 'express'
import UserModel from '../models/user'
import { Blob } from 'buffer';
import { TextEncoder } from 'util';
import { ObjectId } from 'mongodb';

const fs = require('fs');
const path= require('path');

export class UserController{
    name:String
    login = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;
        let tip = req.body.tip;
        

        UserModel.findOne({'username': username, 'password': password, 'tip':tip,'odobren':true}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }
    register = (req: express.Request, res: express.Response)=>{
       
        /*const file = new FileModel({
            name: req.body.pic.name,
            data: req.body.pic.data,
            contentType: req.body.pic.contentType
        })*/
        //const saved= file.save()
        if(req.body.pic=="")
        {
         this.name="assets/usrDefault.png"   
        }else{
            this.name=req.body.username + "_pic.png"
        const fileData = Buffer.from(new Uint8Array(req.body.pic.match(/.{1,2}/g).map((byte) => parseInt(byte, 16))))
        const towrite= path.join(__dirname,"../../../frontend/src/assets/pics")
        const filepath = path.join(towrite,this.name)

        fs.writeFile((filepath),fileData, () => {
            
          });
          this.name="assets/pics/"+this.name
        }

        let user = new UserModel({
            username: req.body.username,
            password: req.body.password,
            tip: req.body.tip,
            imejl: req.body.imejl,
            phoneNum: req.body.phoneNum,
            ime: req.body.ime,
            prezime: req.body.prezime,
            pic: this.name,
            odobren: false

        })

        //let user = new UserModel(req.body)
        
        UserModel.findOne({'username': user.username}, (err, user1)=>{
            if(user1==null) {
                UserModel.findOne({'imejl': user.imejl}, (err1, user2)=>{
                if(user2==null) {
                    user.save((err2, resp)=>{
                        if(err2) {
                            console.log(err2+" dva");
                            res.status(400).json({"message": "error"})
                        }
                        else res.json({"message": "ok"})
                    })
                }
                else {
                    console.log(err1+" jedan");
                    res.json({"message": "emailExists"})
                }
            })}
            else {
                console.log(err+" nula");
                res.json({"message": "usernameExists"})
            }
        })
        

    }
    changePass=(req: express.Request, res: express.Response)=>{
        let username= req.body.username;
        let password= req.body.password;
        let nPassword=req.body.nPassword;

        UserModel.updateOne({'username': username, 'password': password},{password:nPassword}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })

    }
    getAll = (req: express.Request, res: express.Response)=>{
        UserModel.find({'tip':'klijent'}, (err, ags)=>{
            if(err) console.log(err)
            else res.json(ags)
        })
    }
    conf=(req: express.Request, res: express.Response)=>{
        let username= req.body.username;
        let rez=req.body.rez;

        UserModel.updateOne({'username': username},{'odobren':rez}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })

    }
    delete = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        UserModel.deleteOne({'username': username}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }
    
    registerA = (req: express.Request, res: express.Response)=>{
       
        /*const file = new FileModel({
            name: req.body.pic.name,
            data: req.body.pic.data,
            contentType: req.body.pic.contentType
        })*/
        //const saved= file.save()
        if(req.body.pic=="")
        {
         this.name="assets/usrDefault.png"   
        }else{
            this.name=req.body.username + "_pic.png"
        const fileData = Buffer.from(new Uint8Array(req.body.pic.match(/.{1,2}/g).map((byte) => parseInt(byte, 16))))
        const towrite= path.join(__dirname,"../../../frontend/src/assets/pics")
        const filepath = path.join(towrite,this.name)

        fs.writeFile((filepath),fileData, () => {
            
          });
          this.name="assets/pics/"+this.name
        }

        let user = new UserModel({
            username: req.body.username,
            password: req.body.password,
            tip: req.body.tip,
            imejl: req.body.imejl,
            phoneNum: req.body.phoneNum,
            ime: req.body.ime,
            prezime: req.body.prezime,
            pic: this.name,
            odobren: true

        })

        //let user = new UserModel(req.body)
        
        UserModel.findOne({'username': user.username}, (err, user1)=>{
            if(user1==null) {
                UserModel.findOne({'imejl': user.imejl}, (err1, user2)=>{
                if(user2==null) {
                    user.save((err2, resp)=>{
                        if(err2) {
                            console.log(err2+" dva");
                            res.status(400).json({"message": "error"})
                        }
                        else res.json({"message": "ok"})
                    })
                }
                else {
                    console.log(err1+" jedan");
                    res.json({"message": "emailExists"})
                }
            })}
            else {
                console.log(err+" nula");
                res.json({"message": "usernameExists"})
            }
        })
        

    }
    updateD = (req: express.Request, res: express.Response)=>{
       
        /*const file = new FileModel({
            name: req.body.pic.name,
            data: req.body.pic.data,
            contentType: req.body.pic.contentType
        })*/
        //const saved= file.save()
        if(req.body.pic=="")
        {
         this.name=req.body.olPic  
        }else{
            this.name=req.body.username + "_pic.png"
        const fileData = Buffer.from(new Uint8Array(req.body.pic.match(/.{1,2}/g).map((byte) => parseInt(byte, 16))))
        const towrite= path.join(__dirname,"../../../frontend/src/assets/pics")
        const filepath = path.join(towrite,this.name)

        fs.writeFile((filepath),fileData, () => {
            
          });
          this.name="assets/pics/"+this.name
        }

        let user = new UserModel({
            username: req.body.username,
            password: req.body.password,
            tip: req.body.tip,
            imejl: req.body.imejl,
            phoneNum: req.body.phoneNum,
            ime: req.body.ime,
            prezime: req.body.prezime,
            pic: this.name,
            odobren: true

        })

        //let user = new UserModel(req.body)
        
        UserModel.findOne({'username': user.username,'_id': { $ne: new ObjectId(req.body.id) } }, (err, user1)=>{
            if(user1==null) {
                UserModel.findOne({'imejl': user.imejl,'_id': { $ne: new ObjectId(req.body.id) }}, (err1, user2)=>{
                if(user2==null) {
                    UserModel.updateOne({'_id': new ObjectId(req.body.id) },{'username': req.body.username,
                        'password': req.body.password,
                        'tip': req.body.tip,
                        'imejl': req.body.imejl,
                        'phoneNum': req.body.phoneNum,
                        'ime': req.body.ime,
                        'prezime': req.body.prezime,
                        'pic': this.name,
                        'odobren': true}, (err3, user5)=>{
                        if(err3) console.log(err3);
                        else res.json({"message": "ok"})
                    })
            
                }
                else {
                    console.log(err1+" jedan");
                    res.json({"message": "emailExists"})
                }
            })}
            else {
                console.log(err+" nula");
                res.json({"message": "usernameExists"})
            }
        })
        

    }
    fPass = (req: express.Request, res: express.Response)=>{
        let email = req.body.email;
        let tip = req.body.tip;
        

        UserModel.findOne({'imejl': email, 'tip':tip,'odobren':true}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }
}