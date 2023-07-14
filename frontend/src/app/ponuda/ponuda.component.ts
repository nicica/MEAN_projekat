import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { Zahtev } from '../model/zahtev';
import { ZahtevService } from '../zahtev.service';

@Component({
  selector: 'app-ponuda',
  templateUrl: './ponuda.component.html',
  styleUrls: ['./ponuda.component.css']
})
export class PonudaComponent implements OnInit {
  user: User
  posao: Zahtev
  constructor(private router:Router,private zahtevService:ZahtevService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userLoggedIn'));
    this.posao = JSON.parse(localStorage.getItem('curJob'))
  }
  prihvati(){
    this.zahtevService.aktiviraj(this.posao._id).subscribe((respObj)=>{
      
    localStorage.clear()
    sessionStorage.clear()
    localStorage.setItem('userLoggedIn', JSON.stringify(this.user));
    this.router.navigate(['/user'])
    })
  }
  odbij(){
    
    this.zahtevService.brisi(this.posao._id).subscribe((respObj)=>{
      
      localStorage.clear()
      sessionStorage.clear()
      localStorage.setItem('userLoggedIn', JSON.stringify(this.user));
      this.router.navigate(['/user'])
      })

  }

}
