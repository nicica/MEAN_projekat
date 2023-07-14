import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../model/user';
import { Agencija } from '../model/agencija';
import { AgencijaService } from '../agencija.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService,private agencijaService: AgencijaService,private router: Router) { }

  ngOnInit(): void {
    localStorage.clear()
    sessionStorage.clear()
  }
  username: string;
  password: string;
  tip: string;
  message: string;
  login() {
    if (this.tip=='klijent')
    {this.userService.login(this.username,this.password,this.tip).subscribe((userFromDB:User) => {
      
      if(userFromDB!=null){
        localStorage.setItem('userLoggedIn', JSON.stringify(userFromDB));
          this.router.navigate(['/user']);
      }
    else
    {
      this.message="Error"
    }
    
    })}
    else if (this.tip=='agencija'){
      this.agencijaService.login(this.username,this.password,this.tip).subscribe((userFromDB:Agencija) => {
      
        if(userFromDB!=null){
          localStorage.setItem('userLoggedIn', JSON.stringify(userFromDB));
            this.router.navigate(['/agencija']);
        }
      else
      {
        this.message="Error"
      }
      
      })
    }
    else{
      this.message="Error"
    }

  }
  register(){
      this.router.navigate(['/reg'])
  }
  nonReg(){
    this.router.navigate(['/nonreg'])
  }
  zaboravljenaLozinka(){
    this.router.navigate(['/fPass'])
  }
}
