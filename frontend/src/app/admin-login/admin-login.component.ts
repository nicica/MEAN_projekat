import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../model/user';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private userService: UserService,private router: Router) { }

  ngOnInit(): void {
    localStorage.clear()
    sessionStorage.clear()
  }
  username: string;
  password: string;
  message: string;
  login() {
    
    this.userService.login(this.username,this.password,'admin').subscribe((userFromDB:User) => {
      
      if(userFromDB!=null){
        localStorage.setItem('adminLoggedIn', JSON.stringify(userFromDB));
          this.router.navigate(['/adminPf']);
      }
    else
    {
      this.message="Error"
    }
    
    })

  }
}
