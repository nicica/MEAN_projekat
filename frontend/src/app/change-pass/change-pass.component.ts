import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {

  user: User;

  oPassword: string;
  nPassword: string="";
  nPassword2: string="";
  message: string;

  constructor(private router:Router,private userService:UserService) { }


  ngOnInit(): void {
    
    this.user = JSON.parse(localStorage.getItem('userLoggedIn'));
  }
  change(){
    this.userService.login(this.user.username,this.oPassword,this.user.tip).subscribe((userFromDB:User) => {
      
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
            this.userService.changePassword(this.user.username,this.user.password,this.nPassword).subscribe((changePassUser:User)=>{
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
  back(){
    this.router.navigate(['user'])
  }

}
