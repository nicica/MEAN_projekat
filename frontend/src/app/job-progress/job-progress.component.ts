import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Agencija } from '../model/agencija';
import { Zahtev } from '../model/zahtev';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ObjekatService } from '../objekat.service';
import { Objekat } from '../model/objekat';
import { ZahtevService } from '../zahtev.service';

@Component({
  selector: 'app-job-progress',
  templateUrl: './job-progress.component.html',
  styleUrls: ['./job-progress.component.css']
})
export class JobProgressComponent implements OnInit {

  @ViewChild('canvas', { static: false }) canvas: ElementRef<HTMLCanvasElement>;

  skica:string
  user:Agencija
  zahtev:Zahtev
  numR:number
  selectedRoom:number=1

  jsonData:any

  phaseS:number[]=[0,0,0]

  started:boolean[]=[false,false,false]
  finnished:boolean[]=[false,false,false]

  idOb:string



  constructor(private router:Router,private http: HttpClient,private objekatService:ObjekatService,private zahtevService:ZahtevService) { }

  ngOnInit(): void {
   
  }
  ngAfterViewInit(): void { 
    this.zahtev=JSON.parse(localStorage.getItem('thisJob'))
    this.user=JSON.parse(localStorage.getItem('userLoggedIn'))
    this.objekatService.getAllObjekti().subscribe((data:Objekat[])=>{
      this.skica=data.filter(ob=>ob._id==this.zahtev.idObjekat)[0].skica
      this.idOb=data.filter(ob=>ob._id==this.zahtev.idObjekat)[0]._id
      const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    //canvasEl.addEventListener('click', this.onClick.bind(this));
    

    // Now you can work with the canvas element
    // Example: draw on the canvas
    const context = canvasEl.getContext('2d');
    context.clearRect(0, 0, canvasEl.width, canvasEl.height);
    this.load();
    })
    
    
  }
  load(){
    this.http.get(this.skica).subscribe((data: any) => {
      this.numR=data.nR
      this.jsonData=data
      this.phaseS=data.phase
      const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    const context = canvasEl.getContext('2d');
    context.clearRect(0, 0, canvasEl.width, canvasEl.height);
    
    const rect = canvasEl.getBoundingClientRect();
    
    context.lineWidth=2
    for(let i=0;i<data.nR;i++){
      if(this.phaseS[i]==2){
        context.fillStyle='lightgreen'
      context.fillRect(data.x[i], data.y[i], data.xlen[i],data.ylen[i]) 
      }
      else if(this.phaseS[i]==1){
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
    this.router.navigate(['agencija'])
  }
  logout(){
    
    sessionStorage.clear()
    localStorage.clear()
    this.router.navigate([''])
  }
  dodajVrata(a,b,c,d, canvasRef:CanvasRenderingContext2D){
    canvasRef.fillStyle='#B5651D'
    canvasRef.fillRect(a,b,c,d)
  } 
  startRoom(){
    this.phaseS[this.selectedRoom-1]=1
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    const context = canvasEl.getContext('2d');
    context.clearRect(0, 0, canvasEl.width, canvasEl.height);
    
    this.http.get(this.skica).subscribe((data: any) => {
    
      context.lineWidth=2
    for(let i=0;i<data.nR;i++){
      if(this.phaseS[i]==2){
        context.fillStyle='lightgreen'
      context.fillRect(data.x[i], data.y[i], data.xlen[i],data.ylen[i]) 
      }
      else if(this.phaseS[i]==1){
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
    const jData={
      nR: data.nR,
      x: data.x,
      y: data.y,
      xlen: data.xlen,
      ylen: data.ylen,
      nD: data.nD,
      xD:data.xD,
      yD:data.yD,
      posD:data.posD,
      phase: this.phaseS
    }
    this.objekatService.improve(this.idOb,this.skica.split('/')[2],JSON.stringify(jData,null,2)).subscribe((respObj)=>{

    })
    });

    
  }
  finnishRoom(){
    this.phaseS[this.selectedRoom-1]=2
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    const context = canvasEl.getContext('2d');
    context.clearRect(0, 0, canvasEl.width, canvasEl.height);
    
    this.http.get(this.skica).subscribe((data: any) => {
    
      context.lineWidth=2
    for(let i=0;i<data.nR;i++){
      if(this.phaseS[i]==2){
        context.fillStyle='lightgreen'
      context.fillRect(data.x[i], data.y[i], data.xlen[i],data.ylen[i]) 
      }
      else if(this.phaseS[i]==1){
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
    const jData={
      nR: data.nR,
      x: data.x,
      y: data.y,
      xlen: data.xlen,
      ylen: data.ylen,
      nD: data.nD,
      xD:data.xD,
      yD:data.yD,
      posD:data.posD,
      phase: this.phaseS
    }
    this.objekatService.improve(this.idOb,this.skica.split('/')[2],JSON.stringify(jData,null,2)).subscribe((respObj)=>{
      
    })
    console.log(this.phaseS[0] +" "+ this.phaseS[1] +" "+  this.phaseS[2])
    if(this.phaseS[0]==2 && this.phaseS[1]==2 &&  this.phaseS[2]==2){
        
        this.zahtevService.zavrsi(this.zahtev._id).subscribe((respObj)=>{

        })
      }
    });
  }
  otkazi(){
    
  }
}
