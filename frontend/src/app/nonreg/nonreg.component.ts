import { Component, OnInit } from '@angular/core';
import { AgencijaService } from '../agencija.service';
import { Router } from '@angular/router';
import { Agencija } from '../model/agencija';
import { User } from '../model/user';
import { UserService } from '../user.service';
import { Ocena } from '../model/ocena';
import { OceneService } from '../ocene.service';

@Component({
  selector: 'app-nonreg',
  templateUrl: './nonreg.component.html',
  styleUrls: ['./nonreg.component.css']
})
export class NonregComponent implements OnInit {
  agencije: Agencija[]
  agencijeRez: Agencija[]
  filter: string
  byName: number=0
  byAddr: number=0
  byNameS: number=0
  byAddrS: number=0
  searched: number=0
  selectedSortOrder: string

  user: User;
  
 
  constructor(private agencijaService:AgencijaService,private router:Router,private userServica: UserService,private oceneService:OceneService) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('userLoggedIn'));
    this.agencijaService.getAllAgencije().subscribe((data:Agencija[])=>{
      this.agencije = data;
      this.agencijeRez = data;
    })
  }

  back(){
    if(this.user==null)
      this.router.navigate([''])
    else{
      this.user=null
      this.router.navigate(['user'])
    }
  }

  search(){
    if (this.byName==1 && this.byAddr==0){
      this.agencije=this.agencijeRez.filter(agencija => agencija.aName.includes(this.filter))
    }else if (this.byName==0 && this.byAddr==1)
    {
      
      this.agencije=this.agencijeRez.filter(agencija => agencija.address.includes(this.filter))
    }else if (this.byAddr==1 && this.byName==1)
    {
      
      this.agencije=this.agencijeRez.filter(agencija => agencija.aName.includes(this.filter))
      this.agencije=this.agencije.filter(agencija => agencija.address.includes(this.filter))
    }
    else 
    {
      this.agencije=this.agencijeRez
    }
    this.searched=1
  }
  sort(){
    if (this.byNameS==1 && this.byAddrS==0){
      if(this.selectedSortOrder=='asc')
        this.agencije.sort((a: Agencija, b: Agencija) => a.aName.localeCompare(b.aName));
      else if(this.selectedSortOrder=='desc')
        this.agencije.sort((a: Agencija, b: Agencija) => b.aName.localeCompare(a.aName));
    }else if (this.byNameS==0 && this.byAddrS==1)
    {
      
      if(this.selectedSortOrder=='asc')
        this.agencije.sort((a: Agencija, b: Agencija) => a.address.localeCompare(b.address));
      else if(this.selectedSortOrder=='desc')
        this.agencije.sort((a: Agencija, b: Agencija) => b.address.localeCompare(a.address));
    }else if (this.byAddrS==1 && this.byNameS==1)
    {
      
      if(this.selectedSortOrder=='asc')
        this.agencije.sort((a, b) => this.compareAgencije(a, b, "asc"));
      else if(this.selectedSortOrder=='desc')
      this.agencije.sort((a, b) => this.compareAgencije(a, b, "desc"));
      
    }
    else 
    {
      this.agencije=this.agencijeRez
    }
  }

  compareAgencije(a: Agencija, b: Agencija, sortOrder: "asc" | "desc"): number {
    const aValue = a.aName.toLowerCase();
  const bValue = b.aName.toLowerCase();

  if (aValue < bValue) {
    return sortOrder === "asc" ? -1 : 1;
  }
  if (aValue > bValue) {
    return sortOrder === "asc" ? 1 : -1;
  }

  // If the `aName` values are the same, compare by `address`
  const aAddress = a.address.toLowerCase();
  const bAddress = b.address.toLowerCase();

  if (aAddress < bAddress) {
    return sortOrder === "asc" ? -1 : 1;
  }
  if (aAddress > bAddress) {
    return sortOrder === "asc" ? 1 : -1;
  }

  return 0

  }
  redirectToAgencija(ag:Agencija){
    localStorage.setItem('agOcena', JSON.stringify(ag));
    this.router.navigate(['ocene'])
  }
  logout(){
    
    sessionStorage.clear()
    localStorage.clear()
    this.router.navigate([''])
  }
}
