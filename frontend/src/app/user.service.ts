import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(usernameFromForm, passwordFromForm,tipFromForm){
    const data = {
      username: usernameFromForm,
      password: passwordFromForm,
      tip: tipFromForm
    }

    return this.http.post('http://localhost:4000/users/login', data)
  }
  register(usernameFromForm, passwordFromForm,tipFromForm,pnFromForm,imeFromFrom,prezimeFromForm,imejlFromForm,picFromForm){
    const data = {
      username: usernameFromForm,
      password: passwordFromForm,
      tip: tipFromForm,
      imejl: imejlFromForm,
      ime: imeFromFrom,
      prezime: prezimeFromForm,
      phoneNum: pnFromForm,
      pic: picFromForm
      
    }

    return this.http.post('http://localhost:4000/users/register', data)
  }
  changePassword(usernameFromForm,passwordFromForm,newPasswordFromForm){
    const data = {
      username: usernameFromForm,
      password: passwordFromForm,
      nPassword: newPasswordFromForm
      
    }

    return this.http.post('http://localhost:4000/users/changePass', data)
  }
  getAll(){

    return this.http.get(`http://localhost:4000/users/getAll`)
  }
  obrisi(usr){
    const data={
      username:usr
    }
    return this.http.post('http://localhost:4000/users/delete', data)
  }
  odgovor(usr,rezf){
    const data={
      username:usr,
      rez:rezf
    }
    return this.http.post('http://localhost:4000/users/confirmation', data)
  }
  registerAutoAllow(usernameFromForm, passwordFromForm,tipFromForm,pnFromForm,imeFromFrom,prezimeFromForm,imejlFromForm,picFromForm){
    const data = {
      username: usernameFromForm,
      password: passwordFromForm,
      tip: tipFromForm,
      imejl: imejlFromForm,
      ime: imeFromFrom,
      prezime: prezimeFromForm,
      phoneNum: pnFromForm,
      pic: picFromForm
      
    }

    return this.http.post('http://localhost:4000/users/registerAA', data)
  }
  updateData(usernameFromForm, passwordFromForm,tipFromForm,pnFromForm,imeFromFrom,prezimeFromForm,imejlFromForm,picFromForm,olPicFF,idU){
    const data = {
      username: usernameFromForm,
      password: passwordFromForm,
      tip: tipFromForm,
      imejl: imejlFromForm,
      ime: imeFromFrom,
      prezime: prezimeFromForm,
      phoneNum: pnFromForm,
      pic: picFromForm,
      olPic:olPicFF,
      id:idU
      
    }

    return this.http.post('http://localhost:4000/users/updateD', data)
  }
  forgotPass(emailFF,tipFF){
    const data = {
      email: emailFF,
      tip: tipFF
    }

    return this.http.post('http://localhost:4000/users/fPass', data)
  }
  
}