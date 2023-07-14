import { Component, OnInit } from '@angular/core';
import { Agencija } from '../model/agencija';
import { Router } from '@angular/router';
import { AgencijaService } from '../agencija.service';

@Component({
  selector: 'app-edit-agencija',
  templateUrl: './edit-agencija.component.html',
  styleUrls: ['./edit-agencija.component.css']
})
export class EditAgencijaComponent implements OnInit {

  user:Agencija
  editAg:Agencija
  password2:string
  message:string
  dodavanje:boolean=false
  pic:string=""

  constructor(private router:Router,private agencijaService:AgencijaService) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("adminLoggedIn"))
    if(this.user==null){
    this.user=JSON.parse(localStorage.getItem("userLoggedIn"))
    this.editAg=this.user
  }
    else{
    this.editAg=JSON.parse(localStorage.getItem("editingAgen"))
    if(this.editAg==null){
      this.editAg= new Agencija
      this.dodavanje=true
    }
    }
  }
  izmeni(){
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,12}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9]\d{1,14}$/;
    this.message=""
    if(this.editAg.username=="")
    {
      this.message="Morate uneti korisničko ime"
      return;
    }
    if(!passwordRegex.test(this.editAg.password))
    {
      this.message="Šifra mora biti izmedju 7 i 12 karaktera i mora da sadrži bar jedno malo i veliko slovo, bar jedan broj i bar jedan specijalni karakter"
      return;
    }
    if(this.editAg.password!=this.password2)
    {
      this.message="Lozinke moraju biti iste"
      return;
    }
    if(!phoneRegex.test(this.editAg.phoneNum))
    {
      this.message="Unesite validan broj telefona"
      return;
    }
    if(!emailRegex.test(this.editAg.imejl)){
      this.message="Unesite validnu imejl adresu"
      return;
    }
    if(this.editAg.aName=="" || this.editAg.desc=="")
      {
        this.message="Morate popuniti sva polja"
        return;
      }
      const matRegex=/^\d{8}$/;
      const addressRegex = /^[\w\s]+,\s*[\w\s]+,\s*[\w\s]+\s*\d+$/;
      if(!addressRegex.test(this.editAg.address))
      {
        this.message="Unesite ispravnu adresu"
        return;
      }
      if(!matRegex.test(this.editAg.matNum))
      {
        this.message="Unesite ispravan matični broj"
        return;
      }
      
      
    if(this.dodavanje){
      this.agencijaService.registerAutoAllow(this.editAg.username,this.editAg.password,this.editAg.tip,this.editAg.imejl,this.editAg.aName,this.editAg.address,this.editAg.matNum,this.editAg.desc,this.editAg.phoneNum,this.pic).subscribe(respObj=>{
        if(respObj['message']=='ok'){
          if(this.user.tip=='admin')
          this.router.navigate(['/adminPf'])
          else
          this.router.navigate(['/agencija'])
        }
        else if(respObj['message']=="usernameExists"){
          this.message="Username already exists"
        }
        else if(respObj['message']=='emailExists'){
          this.message="Email already in use"
        }
        else{
          this.message = 'Error'
        }
      });
    }
    else
    {
      this.agencijaService.update(this.editAg.username,this.editAg.password,this.editAg.tip,this.editAg.imejl,this.editAg.aName,this.editAg.address,this.editAg.matNum,this.editAg.desc,this.editAg.phoneNum,this.pic,this.editAg.pic,this.editAg._id).subscribe(respObj=>{
        if(respObj['message']=='ok'){
          if(this.user.tip=='admin')
          this.router.navigate(['/adminPf'])
          else
          this.router.navigate(['/agencija'])
        }
        else if(respObj['message']=="usernameExists"){
          this.message="Username already exists"
        }
        else if(respObj['message']=='emailExists'){
          this.message="Email already in use"
        }
        else{
          this.message = 'Error'
        }
      });
    }
  }
  nazad(){
    sessionStorage.clear()
    localStorage.clear()
    if(this.user.tip=='admin'){
      localStorage.setItem('adminLoggedIn', JSON.stringify(this.user));
    this.router.navigate(['/adminPf'])}
    else{
      localStorage.setItem('userLoggedIn', JSON.stringify(this.user));
    this.router.navigate(['/agencija'])}
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.validateImageDimensions(file);
  }
  validateImageDimensions(file: File) {
    const img = new Image();
    img.onload = () => {
      const width = img.width;
      const height = img.height;
  
      if (width >= 100 && height >= 100 && width <= 300 && height <= 300) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const arrayBuffer = e.target.result as ArrayBuffer;
          const uint8Array = new Uint8Array(arrayBuffer);

          this.pic = Array.from(uint8Array).map((byte) => byte.toString(16).padStart(2, '0')).join('');
            };

        reader.readAsArrayBuffer(file);
      } else {
        alert('Please select an image with dimensions between 100x100 and 300x300 pixels.'); 
        }
    };

    img.src = URL.createObjectURL(file);
  }
  editData(){
    this.router.navigate(['editA'])
  }

}
