import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { User } from '../model/user';
import {  Router } from '@angular/router';
import { Room } from '../model/objekat';
import { ObjekatService } from '../objekat.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-new-objekat',
  templateUrl: './new-objekat.component.html',
  styleUrls: ['./new-objekat.component.css']
})




export class NewObjekatComponent implements OnInit,AfterViewInit {
  @ViewChild('canvas', { static: false }) canvas: ElementRef<HTMLCanvasElement>;

  

  user:User
  username: string

  rooms: Room[]

  editingPhase: string
  phase: number=0
  tip: string=""
  address: string
  numR: number
  numDor: number
  size: number
  message: string


  curSize:number=0
  nextR: number=0
  h: number
  w: number

  tipS:string=""

  tipFILE: string="new"

  fillStil: string |CanvasGradient|CanvasPattern

  xCoord: number[]
  yCoord: number[]
  xLen:number[]
  yLen:number[]
  xDor:number[]
  yDor:number[]
  posDor:string[]



  canvasEl: HTMLCanvasElement
  scale: number=1

  file:File
  fileContent:any
  
  toSend:String
  constructor(private router:Router, private objekatService: ObjekatService) { }


  ngOnInit(): void {
    //this.canvas.nativeElement.addEventListener('click',this.onClick,false)
  }
  ngAfterViewInit(): void {
    this.user = JSON.parse(localStorage.getItem('userLoggedIn'));
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    //canvasEl.addEventListener('click', this.onClick.bind(this));
    

    // Now you can work with the canvas element
    // Example: draw on the canvas
    const context = canvasEl.getContext('2d');
    console.log(context.fillStyle)
    context.fillRect(0, 0, canvasEl.width, canvasEl.height);
    
  }
  
  onClick(event: MouseEvent): void {
    if(this.tipS=='auto')
      return

    this.message=""
    if(this.editingPhase=="Dodavanje prostorija")
    {
      if(this.nextR==this.numR)
      {
      this.message="Uneli ste sve sobe"
      return
      }
      if(this.curSize+(this.h*this.w)>this.size)
      {
        this.message="Nemate dovoljno prostora"
        return
      }
      if(this.h!=null && this.w!=null){
      const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
      const context = canvasEl.getContext('2d');
  
      const rect = canvasEl.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      console.log(x+" "+y)

     
  
      context.fillStyle = 'black';
      context.strokeRect(x, y, 20*this.h, 20*this.w);

      this.rooms[this.nextR]= new Room(x,y,20*this.h,20*this.w)

      this.curSize+=(this.h*this.w)
      this.nextR++
      }
      else{
        this.message="Unesite dimenzije prostorije"
      }
    }
    else if (this.editingPhase=="Dodavanje vrata")
    {

    }
    else
    {
      
    }
    
    
  }
 
  logout(){
    
    sessionStorage.clear()
    localStorage.clear()
    this.router.navigate([''])
  }
  back(){
    this.router.navigate(['user'])
  }
  dalje(){
    this.message=""
    if(this.phase==0){
      const addressRegex = /^[\w\s]+,\s*[\w\s]+,\s*[\w\s]+\s*\d+$/;
      if(this.tip!="stan" && this.tip!="kuca")
      {
        this.message="Morate izabrati tip objekta"
        return
      }
      if(!addressRegex.test(this.address))
      {
        this.message="Unesite adresu pravilno (Drzava, Grad, Ulica Broj)"
        return
      }
      if(this.tipFILE=='new'){
      if(this.size==null || this.numR==null){
        this.message="Morate popuniti sva polja"
        return
      }
      if(this.numR!=1 && this.numR!=2 &&  this.numR!=3)
      {
        this.message="Soba moze biti 1, 2 ili 3"
        return
      }
      if(this.size<0){
        this.message="Povrsina ne sme biti negativna"
        return
      }
      
    }
    else if(this.tipFILE=='exists'){
        if(this.file==null){
          this.message="Morate izabrati json fajl"
          return
        }
    }
      this.username=this.user.username

    }
    if(this.phase==1){
      if(this.tipFILE=='new'){
        if(this.tipS=='auto'){
          const jData={
            nR: this.numR,
            x: this.xCoord,
            y: this.yCoord,
            xlen: this.xLen,
            ylen: this.yLen,
            nD: this.numR,
            xD:this.xDor,
            yD:this.yDor,
            posD:this.posDor,
            phase: [0,0,0]
          }
          this.fileContent=JSON.stringify(jData,null,2)
        }
      }
      else if(this.tipFILE=='exists'){
        this.size=0
        for(let i=0;i<this.numR;i++){
          this.size+=(this.xLen[i]/20)*(this.yLen[i]/20)
        }
      }
      
      this.toSend=uuidv4()+".json";
      
      const d=JSON.parse(this.fileContent)
      d.phase=[0,0,0]
      this.fileContent=JSON.stringify(d,null,2)
      this.objekatService.save(this.tip,this.address,this.numR,this.size,this.username,this.toSend,this.fileContent).subscribe(respObj=>{
        
        this.router.navigate(['user'])
        
      });
    }

    this.phase++
  }
  prev(){
    this.phase--
    this.tipS=null
  }


  loadSkica(){
    
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    const context = canvasEl.getContext('2d');
    context.clearRect(0, 0, canvasEl.width, canvasEl.height);
    
    const rect = canvasEl.getBoundingClientRect();
    this.xCoord=[this.numR]
    this.yCoord=[this.numR]
    this.xLen=[this.numR]
    this.yLen=[this.numR]
    this.xDor=[this.numDor]
    this.yDor=[this.numDor]
    this.posDor=[]
    if(this.numR==1){
      const x = canvasEl.width - 20*Math.sqrt(this.size*13/7);
      const y = canvasEl.height- 20*Math.sqrt(this.size*7/13);
    
      context.fillStyle = 'black';
      context.strokeRect(x/2, y/2, 20*Math.sqrt(this.size*13/7),20*Math.sqrt(this.size*7/13));
      this.xCoord[0]=x/2
      this.yCoord[0]=y/2
      this.xLen[0]=20*Math.sqrt(this.size*13/7)
      this.yLen[0]=20*Math.sqrt(this.size*7/13)
      this.xDor[0]=x/2+ 20*Math.sqrt(this.size*13/7)/2
      this.yDor[0]=y/2+20*Math.sqrt(this.size*7/13)-30
      this.posDor[0]='v'
      this.dodajVrata(x/2+ 20*Math.sqrt(this.size*13/7)/2,y/2+20*Math.sqrt(this.size*7/13)-30,10,30,context)
    }
    else if (this.numR==2){
      const x1 = canvasEl.width - 40*Math.sqrt(this.size*13/14);
      const y1 = canvasEl.height- 20*Math.sqrt(this.size*7/26);

      const x2 = canvasEl.width;
      const y2 = canvasEl.height- 20*Math.sqrt(this.size*7/26);
    
      context.fillStyle = 'black';
      context.strokeRect(x1/2, y1/2, 20*Math.sqrt(this.size*13/14),20*Math.sqrt(this.size*7/26));
      this.dodajVrata(x1/2+ 20*Math.sqrt(this.size*13/14)/2,y1/2+20*Math.sqrt(this.size*7/26)-30,10,30,context)
      context.fillStyle = 'black';
      context.strokeRect(x2/2, y2/2, 20*Math.sqrt(this.size*13/14),20*Math.sqrt(this.size*7/26));
      this.dodajVrata(x2/2+ 20*Math.sqrt(this.size*13/14)/2,y2/2+20*Math.sqrt(this.size*7/26)-30,10,30,context)
      this.xCoord[0]=x1/2
      this.yCoord[0]=y1/2
      this.xLen[0]=20*Math.sqrt(this.size*13/14)
      this.yLen[0]=20*Math.sqrt(this.size*7/26)
      this.xDor[0]=x1/2+ 20*Math.sqrt(this.size*13/14)/2
      this.yDor[0]=y1/2+20*Math.sqrt(this.size*7/26)-30
      this.posDor[0]='v'
      this.xCoord[1]=x2/2
      this.yCoord[1]=y2/2
      this.xLen[1]=20*Math.sqrt(this.size*13/14)
      this.yLen[1]=20*Math.sqrt(this.size*7/26)
      this.xDor[1]=x2/2+ 20*Math.sqrt(this.size*13/14)/2
      this.yDor[1]=y2/2+20*Math.sqrt(this.size*7/26)-30
      this.posDor[1]='v'
      
    }
    else if (this.numR==3){
      const x1 = canvasEl.width - 40*Math.sqrt(0.25*this.size*13/7);
      const y1 = canvasEl.height- 40*Math.sqrt(0/25*this.size*7/13);

      const x2 = canvasEl.width;
      const y2 = canvasEl.height- 40*Math.sqrt(0.25*this.size*7/13);

      const x3 = canvasEl.width -20*Math.sqrt(0.5*this.size*13/7);
      const y3 = canvasEl.height;
    
      context.fillStyle = 'black';
      context.strokeRect(x1/2, y2/2, 20*Math.sqrt(0.25*this.size*13/7),20*Math.sqrt(0.25*this.size*7/13));
      this.dodajVrata(x1/2+ 20*Math.sqrt(0.25*this.size*13/7)/2,y2/2+20*Math.sqrt(0.25*this.size*7/13)-30,10,30,context)
      context.fillStyle = 'black';
      context.strokeRect(x2/2, y2/2, 20*Math.sqrt(0.25*this.size*13/7),20*Math.sqrt(0.25*this.size*7/13));
      this.dodajVrata(x2/2+ 20*Math.sqrt(0.25*this.size*13/7)/2,y2/2+20*Math.sqrt(0.25*this.size*7/13)-30,10,30,context)
      context.fillStyle = 'black';
      context.strokeRect(x3/2, y3/2, 20*Math.sqrt(this.size*13/14),20*Math.sqrt(this.size*7/26));
      this.dodajVrata(x3/2+ 20*Math.sqrt(this.size*13/14)/2,y3/2+20*Math.sqrt(this.size*7/26)-30,10,30,context)
      this.xCoord[0]=x1/2
      this.yCoord[0]=y2/2
      this.xLen[0]=20*Math.sqrt(0.25*this.size*13/7)
      this.yLen[0]=20*Math.sqrt(0.25*this.size*7/13)
      this.xDor[0]=x1/2+ 20*Math.sqrt(0.25*this.size*13/7)/2
      this.yDor[0]=y2/2+20*Math.sqrt(0.25*this.size*7/13)-30
      this.posDor[0]='v'
      this.xCoord[1]=x2/2
      this.yCoord[1]=y2/2
      this.xLen[1]=20*Math.sqrt(0.25*this.size*13/7)
      this.yLen[1]=20*Math.sqrt(0.25*this.size*7/13)
      this.xDor[1]=x2/2+ 20*Math.sqrt(0.25*this.size*13/7)/2
      this.yDor[1]=y2/2+20*Math.sqrt(0.25*this.size*7/13)-30
      this.posDor[1]='v'
      this.xCoord[2]=x3/2
      this.yCoord[2]=y3/2
      this.xLen[2]=20*Math.sqrt(this.size*13/14)
      this.yLen[2]=20*Math.sqrt(this.size*7/26)
      this.xDor[2]=x3/2+ 20*Math.sqrt(this.size*13/14)/2
      this.yDor[2]=y3/2+20*Math.sqrt(this.size*7/26)-30
      this.posDor[2]='v'
    }
   
  }
  draw(){
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    const context = canvasEl.getContext('2d');
    context.clearRect(0, 0, canvasEl.width, canvasEl.height);
  }

  dodajVrata(a,b,c,d, canvasRef:CanvasRenderingContext2D){
    canvasRef.fillStyle='brown'
    canvasRef.fillRect(a,b,c,d)
  } 
  onFileSelected(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.fileContent = e.target.result;
        this.parseJsonData(this.fileContent);
      };
      reader.readAsText(this.file);
    }
  }
  parseJsonData(fileContent: string) {
    try {
      const jsonData = JSON.parse(fileContent);
      this.numR=jsonData.nR
      if(this.numR>3 || this.numR<0 || this.numR%1!=0)
      {
        this.message="Neispravni podaci"
        this.file=null
        return
      }
      this.xCoord=[this.numR]
        this.yCoord=[this.numR]
        this.xLen=[this.numR]
        this.yLen=[this.numR]
      for(let i=0;i<this.numR;i++){
        const x = jsonData.x[i];
      const y = jsonData.y[i];
      const xLen = jsonData.xlen[i];
      const yLen = jsonData.ylen[i];

      if (x <= 0 || x >= 800 || y <= 0 || y >= 400 || x+xLen>800 || y+yLen>400) {
        this.file = null;
        this.message = 'Error: Invalid data';
        return;
      }

      if (xLen < 0 || yLen < 0) {
        this.file = null;
        this.message = 'Error: Invalid data';
        return;
      }
        
        this.xCoord[i]=jsonData.x[i]
        this.yCoord[i]=jsonData.y[i]
        this.xLen[i]=jsonData.xlen[i]
        this.yLen[i]=jsonData.ylen[i]
      }
      this.numDor=jsonData.nD
      if(this.numDor<this.numR ||  this.numDor%1!=0)
      {
        this.message="Neispravni podaci"
        this.file=null
        return
      }
      this.xDor=[this.numDor]
        this.yDor=[this.numDor]
        this.posDor=[]
      for(let i=0;i<this.numR;i++){
        const xDor = jsonData.xD[i];
      const yDor = jsonData.yD[i];
      const posDor = jsonData.posD[i];

      if (xDor <= 0 || xDor >= 800 || yDor <= 0 || yDor >= 400) {
        this.file = null;
        this.message = 'Error: Invalid data';
        return;
      }

      if (posDor !== 'h' && posDor !== 'v') {
        this.file = null;
        this.message = 'Error: Invalid data';
        return;
      }
        
        this.xDor[i]=jsonData.xD[i]
        this.yDor[i]=jsonData.yD[i]
        this.posDor[i]=jsonData.posD[i]
      }
      
    } catch (error) {
      this.file=null
      console.error('Error parsing JSON data:', error);
    }
  }
  loadJSON(){
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    const context = canvasEl.getContext('2d');
    context.clearRect(0, 0, canvasEl.width, canvasEl.height);
    
    const rect = canvasEl.getBoundingClientRect();
    context.fillStyle = 'black';
    for(let i=0;i<this.numR;i++){
      context.strokeRect(this.xCoord[i], this.yCoord[i], this.xLen[i],this.yLen[i]);
    }
    for(let i=0;i<this.numDor;i++){
      if(this.posDor[i]=='h'){
        this.dodajVrata(this.xDor[i],this.yDor[i],30,10,context)
      }
      else if(this.posDor[i]=='v'){
        this.dodajVrata(this.xDor[i],this.yDor[i],10,30,context)
      }
    }
  }
}
