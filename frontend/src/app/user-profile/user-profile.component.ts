import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user:User

  constructor(private router:Router) { 

  }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('userLoggedIn'));
  }

  back(){
    this.router.navigate(['user'])
  }
  logout(){
    
    sessionStorage.clear()
    localStorage.clear()
    this.router.navigate([''])
  }
}
