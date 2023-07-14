import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ZahtevService } from '../zahtev.service';
import { Zahtev } from '../model/zahtev';
import { User } from '../model/user';
import { OceneService } from '../ocene.service';
import { Ocena } from '../model/ocena';

@Component({
  selector: 'app-placanje',
  templateUrl: './placanje.component.html',
  styleUrls: ['./placanje.component.css']
})
export class PlacanjeComponent implements OnInit {
  posao: Zahtev
  user: User

  placeno: boolean=false
  message: string

  komentar: string
  ocena: number
  ocenaObj: Ocena

  constructor(private router:Router,private zahtevService:ZahtevService,private ocenaService:OceneService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userLoggedIn'));
    this.posao = JSON.parse(localStorage.getItem('curJob'))
    this.ocenaService.getAll().subscribe((data:Ocena[])=>{
      this.ocenaObj=data.filter(oc=>oc.idPos==this.posao._id)[0]
      if(this.ocenaObj!=null){
        console.log("uslo")
        this.komentar=this.ocenaObj.komentar
        this.ocena=this.ocenaObj.ocena
      }
    })
  }


  plati(){
    this.zahtevService.plati(this.posao._id).subscribe((respObj)=>{
      this.placeno=true
      this.message="Uspesno placeno"
      })
  }
  nazad(){
    
    localStorage.clear()
    sessionStorage.clear()
    localStorage.setItem('userLoggedIn', JSON.stringify(this.user));
    this.router.navigate(['/user'])
  }
  ostaviOcenu(){
    this.message=""
    if(this.ocena!=null){
      if(this.ocena<0 || this.ocena>10)
      {
        this.message="Morate uneti broj izmedju 0 i 10"
        return
      }
    }
    if(!this.posao.placen)
    {this.ocenaService.addOne(this.posao.agencyUsr,this.user.ime,this.user.prezime,this.komentar,this.ocena,this.posao._id).subscribe((respObj)=>{
      this.nazad()
    })
  }
  else
  {
    this.ocenaService.update(this.komentar,this.ocena,this.ocenaObj._id).subscribe((respObj)=>{
      this.nazad()
    })
  }

  }

}
