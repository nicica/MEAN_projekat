import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agencija } from '../model/agencija';
import { User } from '../model/user';
import { OceneService } from '../ocene.service';
import { Ocena } from '../model/ocena';

@Component({
  selector: 'app-ocene',
  templateUrl: './ocene.component.html',
  styleUrls: ['./ocene.component.css']
})
export class OceneComponent implements OnInit {

  agencija:Agencija

  curUser: User
  ocene:Ocena[]


  constructor(private roouter:Router,private oceneService:OceneService) { }

  ngOnInit(): void {
    this.curUser=JSON.parse(localStorage.getItem('userLoggedIn'));
    this.agencija = JSON.parse(localStorage.getItem('agOcena'));
    
    this.oceneService.getAll().subscribe((data:Ocena[])=>{
      this.ocene=data.filter(oc=>oc.idKomp==this.agencija.username)
    })
  }
  back(){
    sessionStorage.clear()
    localStorage.clear()
    if(this.curUser!=null)
      localStorage.setItem('userLoggedIn', JSON.stringify(this.curUser));
    this.roouter.navigate(['nonreg'])
  }
  logout(){
    
    sessionStorage.clear()
    localStorage.clear()
    this.roouter.navigate([''])
  }
  
}
