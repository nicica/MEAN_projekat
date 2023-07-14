import { Component, OnInit } from '@angular/core';
import { Agencija } from '../model/agencija';
import { AgencijaService } from '../agencija.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-pass-a',
  templateUrl: './change-pass-a.component.html',
  styleUrls: ['./change-pass-a.component.css']
})
export class ChangePassAComponent implements OnInit {

  agencija: Agencija;

  oPassword: string;
  nPassword: string="";
  nPassword2: string="";
  message: string;
  constructor(private userService:AgencijaService,private router:Router) { }

  ngOnInit(): void {
    
    this.agencija = JSON.parse(localStorage.getItem('userLoggedIn'));
  }
  change(){
    this.userService.login(this.agencija.username,this.oPassword,this.agencija.tip).subscribe((userFromDB:Agencija) => {
      
      if(userFromDB!=null){
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,12}$/;
        if(!passwordRegex.test(this.nPassword) )
          {
            this.message="Šifra mora biti izmedju 7 i 12 karaktera i mora da sadrži bar jedno malo i veliko slovo, bar jedan broj i bar jedan specijalni karakter"
          }
          else if (this.nPassword!=this.nPassword2){
            this.message="Lozinke moraju biti iste"
          }
          else
          {
            this.userService.changePassword(this.agencija.username,this.agencija.password,this.nPassword).subscribe((changePassUser:Agencija)=>{
                  if(changePassUser!=null){
                    this.router.navigate(['']);
                  }
                  else
                  {
                    this.message="Greska pri promeni lozinke"
                  }
            })
          }
      }
    else
    {
      this.message="Pogresna lozinka"
    }
    
    })

}
  nazad(){
    this.router.navigate(['agencija'])
  }
}
