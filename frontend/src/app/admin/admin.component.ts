import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { AgencijaService } from '../agencija.service';
import { User } from '../model/user';
import { ZahtevService } from '../zahtev.service';
import { Agencija } from '../model/agencija';
import { Zahtev } from '../model/zahtev';
import { Otkaz } from '../model/otkaz';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  user:User

  korisnici:User[]
  agencije:Agencija[]

  zahUsers:User[]
  zahAgencije:Agencija[]


  poslovi:Zahtev[]
  orkazi:Otkaz[]

  constructor(private router:Router,private userService:UserService,private agencijaService:AgencijaService,private zahtevService:ZahtevService  ) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("adminLoggedIn"))
    this.zahtevService.getAllZahtevi().subscribe((data:Zahtev[])=>{
      this.poslovi=data
    })
    this.userService.getAll().subscribe((data:User[])=>{
      this.korisnici=data.filter(ko=>ko.odobren)
      this.zahUsers=data.filter(ko=>!ko.odobren && ko.odobren!=null)
    })
    this.agencijaService.getAllAgencije().subscribe((data:Agencija[])=>{
      this.agencije=data.filter(ko=>ko.odobren)
      this.zahAgencije=data.filter(ko=>!ko.odobren && ko.odobren!=null )
    })
    this.zahtevService.getAllOtkazi().subscribe((data:Otkaz[])=>{
      this.orkazi=data
      console.log(this.orkazi.length)
    })
  }

  logout(){
    
    sessionStorage.clear()
    localStorage.clear()
    this.router.navigate(['admin'])
  }

  obrisiKor(usr:string){
    this.userService.obrisi(usr).subscribe((respObj)=>{
      this.userService.getAll().subscribe((data:User[])=>{
        this.korisnici=data.filter(ko=>ko.odobren)
        this.zahUsers=data.filter(ko=>!ko.odobren && ko.odobren!=null)
      })
    })
  }

  obrisiAg(usr:string){
    this.agencijaService.obrisi(usr).subscribe((respObj)=>{
      this.agencijaService.getAllAgencije().subscribe((data:Agencija[])=>{
        this.agencije=data.filter(ko=>ko.odobren)
        this.zahAgencije=data.filter(ko=>!ko.odobren && ko.odobren!=null )
      })
    })
  }
  prihvatiKor(usr:string){
    this.userService.odgovor(usr,true).subscribe((respObj)=>{
      this.ngOnInit()
    })
  }

  prihvatiAg(usr:string){
    this.agencijaService.odgovor(usr,true).subscribe((respObj)=>{
      this.ngOnInit()
    })
  }
  odbijKor(usr:string){
    this.userService.odgovor(usr,null).subscribe((respObj)=>{
      this.ngOnInit()
    })
  }

  odbijAg(usr:string){
    this.agencijaService.odgovor(usr,null).subscribe((respObj)=>{
      this.ngOnInit()
    })
  }
  editUser(usr: User){
    localStorage.setItem("editingUser",JSON.stringify(usr))
    this.router.navigate(["/editU"])
  }
  editAgencija(usr: Agencija){
    localStorage.setItem("editingAgen",JSON.stringify(usr))
    this.router.navigate(["/editA"])
  }
  odgovor(resp: boolean,ot: Otkaz){
    this.zahtevService.promeni(ot._id,resp,ot.idPosla).subscribe((respObj)=>{
      this.zahtevService.otkaziPosao(ot.idPosla).subscribe((respObj)=>{
        this.ngOnInit()
      })
      
    })
    
    
  }

}
