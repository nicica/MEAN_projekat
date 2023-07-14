import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { Zahtev } from '../model/zahtev';
import { ZahtevService } from '../zahtev.service';

@Component({
  selector: 'app-pregled-objekta',
  templateUrl: './pregled-objekta.component.html',
  styleUrls: ['./pregled-objekta.component.css']
})
export class PregledObjektaComponent implements OnInit,AfterViewInit {
  @ViewChild('canvas', { static: false }) canvas: ElementRef<HTMLCanvasElement>;

  skica:string
  user:User
  zahtev:Zahtev

  constructor(private router:Router,private http: HttpClient,private zahtevService:ZahtevService) { }

  ngOnInit(): void {
   
  }
  ngAfterViewInit(): void { 
    this.skica=JSON.parse(localStorage.getItem('viewActiveJob'))
    this.user=JSON.parse(localStorage.getItem('userLoggedIn'))
    this.zahtev=JSON.parse(localStorage.getItem('thisZahtev'))
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    //canvasEl.addEventListener('click', this.onClick.bind(this));
    

    // Now you can work with the canvas element
    // Example: draw on the canvas
    const context = canvasEl.getContext('2d');
    context.clearRect(0, 0, canvasEl.width, canvasEl.height);
    this.load();
    
  }
  load(){
    this.http.get(this.skica).subscribe((data: any) => {
      
      const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    const context = canvasEl.getContext('2d');
    context.clearRect(0, 0, canvasEl.width, canvasEl.height);
    
    const rect = canvasEl.getBoundingClientRect();
    
    context.lineWidth=2
    for(let i=0;i<data.nR;i++){
      if(data.phase[i]==2){
        context.fillStyle='lightgreen'
      context.fillRect(data.x[i], data.y[i], data.xlen[i],data.ylen[i]) 
      }
      else if(data.phase[i]==1){
        context.fillStyle='red'
      context.fillRect(data.x[i], data.y[i], data.xlen[i],data.ylen[i]) 
      }
      context.fillStyle = 'black';
      context.strokeRect(data.x[i], data.y[i], data.xlen[i],data.ylen[i]);
    }
    for(let i=0;i<data.nD;i++){
      if(data.posD[i]=='h'){
        this.dodajVrata(data.xD[i],data.yD[i],30,10,context)
      }
      else if(data.posD[i]=='v'){
        this.dodajVrata(data.xD[i],data.yD[i],10,30,context)
      }
    }
    });
  }
  back(){
    sessionStorage.clear()
    localStorage.clear()
    localStorage.setItem('userLoggedIn', JSON.stringify(this.user));
    this.router.navigate(['user'])
  }
  logout(){
    
    sessionStorage.clear()
    localStorage.clear()
    this.router.navigate([''])
  }
  dodajVrata(a,b,c,d, canvasRef:CanvasRenderingContext2D){
    canvasRef.fillStyle='brown'
    canvasRef.fillRect(a,b,c,d)
  } 
  otkazi(){
    this.zahtevService.otkazi(this.zahtev._id).subscribe((respObj)=>{
      this.back()
    })

  }
}
