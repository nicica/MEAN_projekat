import { Component, OnInit } from '@angular/core';
import { Agencija } from '../model/agencija';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agencija-profile',
  templateUrl: './agencija-profile.component.html',
  styleUrls: ['./agencija-profile.component.css']
})
export class AgencijaProfileComponent implements OnInit {

  user:Agencija

  constructor(private router:Router) { 

  }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('userLoggedIn'));
  }

  back(){
    this.router.navigate(['agencija'])
  }
  logout(){
    
    sessionStorage.clear()
    localStorage.clear()
    this.router.navigate([''])
  }
  editData(){
    this.router.navigate(['editA'])
  }
}
