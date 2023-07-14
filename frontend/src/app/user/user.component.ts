import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import {  Router } from '@angular/router';
import { Objekat } from '../model/objekat';
import { ObjekatService } from '../objekat.service';
import { AgencijaService } from '../agencija.service';
import { Agencija } from '../model/agencija';
import { ZahtevService } from '../zahtev.service';
import { Zahtev } from '../model/zahtev';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User;
  prikaz: boolean=false;
  novPosao: boolean=false
  zahPrikaz: boolean=false
  
  objekti: Objekat[]
  agencije: Agencija[]


  faza:number=0

  startDate: Date;
  endDate: Date;
  selectedAgencija: Agencija;
  selectedObjekat: Objekat;

  message: string

  zahtevi: Zahtev[]
  zahteviRes: Zahtev[]



  

  constructor(private router:Router,private objekatService:ObjekatService, private agencijaService: AgencijaService
    ,private zahtevService:ZahtevService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userLoggedIn'));
    this.objekatService.getAllObjekti().subscribe((data:Objekat[])=>{
      this.objekti = data.filter(obj=>obj.vlasnik!=this.user.username);
    })
    this.agencijaService.getAllAgencije().subscribe((data:Agencija[])=>{
      this.agencije = data;
    })
    this.zahtevService.getAllZahtevi().subscribe((data:Zahtev[])=>{
      this.zahtevi = data.filter(zah=>zah.ownerUsr==(this.user.username));
      this.zahteviRes=data.filter(zah=>zah.ownerUsr==(this.user.username));;
    })
  }

  logout(){
    
    sessionStorage.clear()
    localStorage.clear()
    this.router.navigate([''])
  }
  changePass(){
    this.router.navigate(['changePass'])
  }
  editData(){
    this.router.navigate(['editU'])
  }

  showAgencije(){
    this.router.navigate(['nonreg'])
  }
  showProfile(){
    this.router.navigate(['userProfile'])
  }
  showObjekti(){
    this.prikaz=!this.prikaz
  }
  showFormaZaNoviPosao(){
    this.novPosao=!this.novPosao
  }
  newObjekat(){
    this.router.navigate(['newObjekat'])
  }
  izmeni(objekat: Objekat){
    localStorage.setItem('editingObject', JSON.stringify(objekat));
    this.router.navigate(['izmeniObjekat'])
  }
  delete(objekat: Objekat){
    this.objekatService.deleteObjekat(objekat._id).subscribe((respObj)=>{
      this.objekti=this.objekti.filter(ob=>ob._id!=objekat._id)
    })
    

  }  
  preview(objekat: Objekat){
    for (let i=0;i<this.objekti.length;i++){
      if(objekat._id==this.objekti[i]._id)
      {
        localStorage.setItem('viewAndEditObj', JSON.stringify(this.objekti[i].skica));
      }
    }
    this.router.navigate(['preview'])

  }
  onChangeAgencija(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedIndex = target.selectedIndex;
    this.selectedAgencija = this.agencije[selectedIndex];
  }
  
  onChangeObjekat(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedIndex = target.selectedIndex;
    this.selectedObjekat = this.objekti[selectedIndex];
  }

  onSubmit(): void {
    this.message=""
    if(this.startDate>this.endDate){
      this.message="Izaberite datume ispravno"
      return
    }
    this.zahtevService.newR(this.user.username,this.selectedAgencija.username,this.selectedAgencija.aName,this.selectedObjekat._id,this.startDate,this.endDate).subscribe(
      (respObj)=>{
        if(respObj['message']=='ok'){
          this.message="Zahtev uspesno poslat"
          this.novPosao=!this.novPosao
          this.zahtevService.getAllZahtevi().subscribe((data:Zahtev[])=>{
            this.zahtevi = data.filter(zah=>zah.ownerUsr==(this.user.username));
            this.zahteviRes=data.filter(zah=>zah.ownerUsr==(this.user.username));;
          })
        }
      }
    )
  }

  filter(){
    if(this.faza==1)
    {
      this.zahtevi=this.zahteviRes.filter(zah=>zah.phase=='poslat' || zah.phase=='odbijen' || zah.phase=='prihvacen')
    }
    else if(this.faza==2){
      this.zahtevi=this.zahteviRes.filter(zah=>zah.phase=='aktivan')
    }else if (this.faza==3){this.zahtevi=this.zahteviRes.filter(zah=>zah.phase=='zavrsen')}
    else{this.zahtevi=this.zahteviRes}

  }
  showPoslovi(){
    this.zahPrikaz=!this.zahPrikaz
  }
  ponuda(zah: Zahtev){
    localStorage.setItem('curJob', JSON.stringify(zah));
    this.router.navigate(['/ponuda'])

  }
  placanje(zah: Zahtev){
    localStorage.setItem('curJob', JSON.stringify(zah));
    this.router.navigate(['/placanje'])
  }

  prikaziStanje(idObj: string,zah: Zahtev){
    for (let i=0;i<this.objekti.length;i++){
      if(idObj==this.objekti[i]._id)
      {
        localStorage.setItem('viewActiveJob', JSON.stringify(this.objekti[i].skica));
        localStorage.setItem('thisZahtev', JSON.stringify(zah));
        break
      }
    }
    this.router.navigate(['/prevO'])
  }
}
