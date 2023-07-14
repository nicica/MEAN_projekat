import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgencijaService {

  constructor(private http: HttpClient) { }

  login(usernameFromForm, passwordFromForm,tipFromForm){
    const data = {
      username: usernameFromForm,
      password: passwordFromForm,
      tip: tipFromForm
    }

    return this.http.post('http://localhost:4000/agencija/login', data)
  }
  register(usernameFromForm, passwordFromForm,tipFromForm,imejlFromForm,aNameFromForm,addressFromForm,marNumFromForm,descFromForm,pnFromForm,picFromForm){
    const data = {
      username: usernameFromForm,
      password: passwordFromForm,
      tip: tipFromForm,
      imejl: imejlFromForm,
      aName: aNameFromForm,
      address: addressFromForm,
      matNum: marNumFromForm,
      desc: descFromForm,
      phoneNum: pnFromForm,
      pic: picFromForm
      
    }
    return this.http.post('http://localhost:4000/agencija/register', data)
  }
  changePassword(usernameFromForm,passwordFromForm,newPasswordFromForm){
    const data = {
      username: usernameFromForm,
      password: passwordFromForm,
      nPassword: newPasswordFromForm
      
    }

    return this.http.post('http://localhost:4000/agencija/changePass', data)
  }
  getAllAgencije(){

    return this.http.get(`http://localhost:4000/agencija/getAllAgencije`)
  }
  obrisi(usr){
    const data={
      username:usr
    }
    return this.http.post('http://localhost:4000/agencija/delete', data)
  }
  odgovor(usr,rezf){
    const data={
      username:usr,
      rez:rezf
    }
    return this.http.post('http://localhost:4000/agencija/confirmation', data)
  }
  registerAutoAllow(usernameFromForm, passwordFromForm,tipFromForm,imejlFromForm,aNameFromForm,addressFromForm,marNumFromForm,descFromForm,pnFromForm,picFromForm){
    const data = {
      username: usernameFromForm,
      password: passwordFromForm,
      tip: tipFromForm,
      imejl: imejlFromForm,
      aName: aNameFromForm,
      address: addressFromForm,
      matNum: marNumFromForm,
      desc: descFromForm,
      phoneNum: pnFromForm,
      pic: picFromForm
      
    }
    return this.http.post('http://localhost:4000/agencija/registerAA', data)
  }
  update(usernameFromForm, passwordFromForm,tipFromForm,imejlFromForm,aNameFromForm,addressFromForm,marNumFromForm,descFromForm,pnFromForm,picFromForm,olPicff,idU){
    const data = {
      username: usernameFromForm,
      password: passwordFromForm,
      tip: tipFromForm,
      imejl: imejlFromForm,
      aName: aNameFromForm,
      address: addressFromForm,
      matNum: marNumFromForm,
      desc: descFromForm,
      phoneNum: pnFromForm,
      pic: picFromForm,
      olPic:olPicff,
      id:idU
      
    }
    return this.http.post('http://localhost:4000/agencija/updateD', data)
  }
  forgotPass(emailFF,tipFF){
    const data = {
      email: emailFF,
      tip: tipFF
    }

    return this.http.post('http://localhost:4000/agencija/fPass', data)
  }
}