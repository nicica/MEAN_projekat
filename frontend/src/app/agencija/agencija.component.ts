import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agencija } from '../model/agencija';
import { Zahtev } from '../model/zahtev';
import { ZahtevService } from '../zahtev.service';

@Component({
  selector: 'app-agencija',
  templateUrl: './agencija.component.html',
  styleUrls: ['./agencija.component.css']
})
export class AgencijaComponent implements OnInit {

  agencija: Agencija  
  zahPrikaz: boolean=false

  poslovi:Zahtev[]

  ponuda:boolean=false

  nadoknada: number

  zaPotvdu: Zahtev

  constructor(private router:Router,private zahtevService:ZahtevService) { }

  ngOnInit(): void {
    this.agencija = JSON.parse(localStorage.getItem('userLoggedIn'));
    this.zahtevService.getAllZahtevi().subscribe((data:Zahtev[])=>{
      this.poslovi=data.filter(za=>za.agencyUsr==this.agencija.username && za.phase!='odbijen')
    })
  }

  logout(){
    
    sessionStorage.clear()
    localStorage.clear()
    this.router.navigate([''])
  }
  changePass(){
    this.router.navigate(['changePassA'])
  }
  showProfile(){
    this.router.navigate(['agenProfile'])
  }
  
  showPoslovi(){
    this.zahPrikaz=!this.zahPrikaz
  }
  prihvati(zah: Zahtev){
    this.ponuda=true
    this.zaPotvdu=zah
  }
  odbij(zah: Zahtev){
    this.zahtevService.odgovori(zah._id,'odbijen',null).subscribe((respObj)=>{
      this.zahtevService.getAllZahtevi().subscribe((data:Zahtev[])=>{
        this.poslovi=data.filter(za=>za.agencyUsr==this.agencija.username && za.phase!='odbijen')
      })
    })
  }
  posalji(){
    this.zahtevService.odgovori(this.zaPotvdu._id,'prihvacen',this.nadoknada).subscribe((respObj)=>{
      this.zaPotvdu=null
      this.ponuda=false
      this.zahtevService.getAllZahtevi().subscribe((data:Zahtev[])=>{
        this.poslovi=data.filter(za=>za.agencyUsr==this.agencija.username && za.phase!='odbijen')
      })
    })
  }
  detalji(zah: Zahtev){
    localStorage.setItem("thisJob",JSON.stringify(zah))
    this.router.navigate(['jobP'])
  }
  editData(){
    this.router.navigate(['editA'])
  }

}
