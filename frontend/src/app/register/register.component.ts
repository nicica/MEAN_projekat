import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AgencijaService } from '../agencija.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService,private agencijaService: AgencijaService,private router: Router) { }
  message: string;
  username: string="";
  password: string="";
  password2: string;
  phoneNum: string="";
  email: string="";
  tip: string;
  firstname: string="";
  lastname: string="";
  aName: string="";
  address: string="";
  matNum: string="";
  desc: string="";
  pic: string="";

  
  
  ngOnInit(): void {
  }

  register(){
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,12}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9]\d{1,14}$/;
    this.message=""
    if(this.tip!='klijent' && this.tip!='agencija'){
      this.message="Morate izabrati šta ste"
      return;
    }
    if(this.username=="")
    {
      this.message="Morate uneti korisničko ime"
      return;
    }
    if(!passwordRegex.test(this.password))
    {
      this.message="Šifra mora biti izmedju 7 i 12 karaktera i mora da sadrži bar jedno malo i veliko slovo, bar jedan broj i bar jedan specijalni karakter"
      return;
    }
    if(this.password!=this.password2)
    {
      this.message="Lozinke moraju biti iste"
      return;
    }
    if(!phoneRegex.test(this.phoneNum))
    {
      this.message="Unesite validan broj telefona"
      return;
    }
    if(!emailRegex.test(this.email)){
      this.message="Unesite validnu imejl adresu"
      return;
    }
    if(this.tip=='klijent'){
      
      if(this.firstname=="" || this.lastname=="")
        {
          this.message="Morate popuniti sva polja"
          return;
        }
        
        this.userService.register(this.username,this.password,this.tip,this.phoneNum,this.firstname,this.lastname,this.email,this.pic).subscribe(respObj=>{
          if(respObj['message']=='ok'){
            this.router.navigate([''])
          }
          else if(respObj['message']=='usernameExists'){
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
    else{
      if(this.aName=="" || this.desc=="")
      {
        this.message="Morate popuniti sva polja"
        return;
      }
      const matRegex=/^\d{8}$/;
      const addressRegex = /^[\w\s]+,\s*[\w\s]+,\s*[\w\s]+\s*\d+$/;
      if(!addressRegex.test(this.address))
      {
        this.message="Unesite ispravnu adresu"
        return;
      }
      if(!matRegex.test(this.matNum))
      {
        this.message="Unesite ispravan matični broj"
        return;
      }
      
      this.agencijaService.register(this.username,this.password,this.tip,this.email,this.aName,this.address,this.matNum,this.desc,this.phoneNum,this.pic).subscribe(respObj=>{
        if(respObj['message']=='ok'){
          this.router.navigate([''])
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
  back(){
    this.router.navigate([''])
  }
  
}
