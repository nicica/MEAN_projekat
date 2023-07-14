import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user:User
  editUsr:User
  password2:string
  message:string

  dodavanje:boolean=false
  pic:string=""

  constructor(private router:Router,private userService:UserService) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("adminLoggedIn"))
    if(this.user==null){
    this.user=JSON.parse(localStorage.getItem("userLoggedIn"))
    this.editUsr=this.user
  }
    else{
    this.editUsr=JSON.parse(localStorage.getItem("editingUser"))
    if(this.editUsr==null)
      {this.editUsr=new User
        
        this.dodavanje=true}
    }

    
  }

  izmeni(){
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,12}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9]\d{1,14}$/;
    this.message=""
  
    if(this.editUsr.username=="")
    {
      this.message="Morate uneti korisničko ime"
      return;
    }
    if(!passwordRegex.test(this.editUsr.password))
    {
      this.message="Šifra mora biti izmedju 7 i 12 karaktera i mora da sadrži bar jedno malo i veliko slovo, bar jedan broj i bar jedan specijalni karakter"
      return;
    }
    if(this.editUsr.password!=this.password2)
    {
      this.message="Lozinke moraju biti iste"
      return;
    }
    if(!phoneRegex.test(this.editUsr.phoneNum))
    {
      this.message="Unesite validan broj telefona"
      return;
    }
    if(!emailRegex.test(this.editUsr.imejl)){
      this.message="Unesite validnu imejl adresu"
      return;
    }
    if(this.editUsr.ime=="" || this.editUsr.prezime=="")
    {
      this.message="Morate popuniti sva polja"
      return;
    }
    if(this.dodavanje){
      
    this.userService.registerAutoAllow(this.editUsr.username,this.editUsr.password,"klijent",this.editUsr.phoneNum,this.editUsr.ime,this.editUsr.prezime,this.editUsr.imejl,this.pic).subscribe(respObj=>{
      if(respObj['message']=='ok'){
        if(this.user.tip=='admin')
          this.router.navigate(['/adminPf'])
          else
          this.router.navigate(['/user'])
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
    else
    {
      this.userService.updateData(this.editUsr.username,this.editUsr.password,"klijent",this.editUsr.phoneNum,this.editUsr.ime,this.editUsr.prezime,this.editUsr.imejl,this.pic,this.editUsr.pic,this.editUsr._id).subscribe(respObj=>{
        if(respObj['message']=='ok'){
          if(this.user.tip=='admin')
          this.router.navigate(['/adminPf'])
          else
          this.router.navigate(['/user'])
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

  }
  nazad(){
    sessionStorage.clear()
    localStorage.clear()
    

    if(this.user.tip=='admin'){
      localStorage.setItem('adminLoggedIn', JSON.stringify(this.user));
    this.router.navigate(['/adminPf'])}
    else{
      localStorage.setItem('userLoggedIn', JSON.stringify(this.user));
    this.router.navigate(['/user'])}
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



}
