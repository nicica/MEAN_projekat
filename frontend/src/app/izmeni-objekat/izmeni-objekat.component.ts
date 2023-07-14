import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { Objekat } from '../model/objekat';
import { ObjekatService } from '../objekat.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-izmeni-objekat',
  templateUrl: './izmeni-objekat.component.html',
  styleUrls: ['./izmeni-objekat.component.css']
})
export class IzmeniObjekatComponent implements OnInit,AfterViewInit {
  @ViewChild('canvas', { static: false }) canvas: ElementRef<HTMLCanvasElement>;

  user:User
  objekat: Objekat
  message: string

  tip:string
  address:string
  size:number
  numR:number  

  izmenaD:boolean=false

  tipFILE:string='new'

  file:File

  fileContent:any

  xCoord: number[]
  yCoord: number[]
  xLen:number[]
  yLen:number[]
  xDor:number[]
  yDor:number[]
  posDor:string[]

 
  numDor: number

  constructor(private router:Router,private objekatService:ObjekatService,private http: HttpClient) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userLoggedIn'));
    
    this.objekat = JSON.parse(localStorage.getItem('editingObject'));
    
  }
  ngAfterViewInit(): void {
    this.user = JSON.parse(localStorage.getItem('userLoggedIn'));
    
    this.objekat = JSON.parse(localStorage.getItem('editingObject'));
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    //canvasEl.addEventListener('click', this.onClick.bind(this));
    

    // Now you can work with the canvas element
    // Example: draw on the canvas
    const context = canvasEl.getContext('2d');
    console.log(context.fillStyle)
    context.clearRect(0, 0, canvasEl.width, canvasEl.height);
    this.http.get(this.objekat.skica).subscribe((data: any) => {
      const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    const context = canvasEl.getContext('2d');
    context.clearRect(0, 0, canvasEl.width, canvasEl.height);
    
    const rect = canvasEl.getBoundingClientRect();
    context.fillStyle = 'black';
    for(let i=0;i<data.nR;i++){
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
  izmeni(){
    const addressRegex = /^[\w\s]+,\s*[\w\s]+,\s*[\w\s]+\s*\d+$/;
      if(!addressRegex.test(this.objekat.address) && this.objekat.address!=null)
      {
        this.message="Unesite adresu pravilno (Drzava, Grad, Ulica Broj)"
        return
      }
      if(this.objekat.numR<1 || this.objekat.numR>3 || this.objekat.numR%1!=0 )
      {
        this.message="Maksimalan broj soba je 3"
        return
      }
      if(this.file==null){
      if(this.objekat.address==null){
        this.message="Greska"
        return
      }
      if(this.objekat.numR==null){
        this.message="Greska"
        return
      }
      if(this.objekat.size==null || this.objekat.size<0){
        this.message="Greska"
        return
      }}
      if(this.fileContent==null){
        
          const jData={
            nR: this.objekat.numR,
            x: this.xCoord,
            y: this.yCoord,
            xlen: this.xLen,
            ylen: this.yLen,
            nD: this.objekat.numR,
            xD:this.xDor,
            yD:this.yDor,
            posD:this.posDor,
            phase: [0,0,0]
          }
          this.fileContent=JSON.stringify(jData,null,2)
          console.log("here")
        
      }else{
        this.objekat.size=0
        for(let i=0;i<this.numR;i++){
          this.objekat.size+=(this.xLen[i]/20)*(this.yLen[i]/20)
        }
      }
      this.fileContent.phase=[0,0,0]
      const skicaname=this.objekat.skica.split('/')
      this.objekatService.change(this.objekat.tip,this.objekat.address,this.objekat.numR,this.objekat.size,this.objekat._id,skicaname[2],this.fileContent).subscribe(respObj=>{
        
        this.back()
        
      });

      
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
    this.message=''
    if(this.file==null){
      this.message="Niste uneli fajl"
      
    return
    }
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
  izmena(){
    this.izmenaD=!this.izmenaD
    this.reload()
  }
  reload(){
    this.message=''
    if((this.objekat.numR<1 || this.objekat.numR>3 || this.objekat.size<0) && this.tipFILE=='new')
      {
        this.message="Unesite ispravne podatke"
        return
      }
    this.http.get(this.objekat.skica).subscribe((data: any) => {
      const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    const context = canvasEl.getContext('2d');
    context.clearRect(0, 0, canvasEl.width, canvasEl.height);
    
    const rect = canvasEl.getBoundingClientRect();
    context.fillStyle = 'black';
    for(let i=0;i<data.nR;i++){
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

  loadByNewInfo(){
    if(this.tipFILE=='exists'){
      this.loadJSON()
      return
    }
    this.file=null
    this.fileContent=null
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    const context = canvasEl.getContext('2d');
    context.clearRect(0, 0, canvasEl.width, canvasEl.height);
    
    const rect = canvasEl.getBoundingClientRect();
    this.xCoord=[this.objekat.numR]
    this.yCoord=[this.objekat.numR]
    this.xLen=[this.objekat.numR]
    this.yLen=[this.objekat.numR]
    this.xDor=[this.objekat.numR]
    this.yDor=[this.objekat.numR]
    this.posDor=[]
    if(this.objekat.numR==1){
      const x = canvasEl.width - 20*Math.sqrt(this.objekat.size*13/7);
      const y = canvasEl.height- 20*Math.sqrt(this.objekat.size*7/13);
    
      context.fillStyle = 'black';
      context.strokeRect(x/2, y/2, 20*Math.sqrt(this.objekat.size*13/7),20*Math.sqrt(this.objekat.size*7/13));
      this.xCoord[0]=x/2
      this.yCoord[0]=y/2
      this.xLen[0]=20*Math.sqrt(this.objekat.size*13/7)
      this.yLen[0]=20*Math.sqrt(this.objekat.size*7/13)
      this.xDor[0]=x/2+ 20*Math.sqrt(this.objekat.size*13/7)/2
      this.yDor[0]=y/2+20*Math.sqrt(this.objekat.size*7/13)-30
      this.posDor[0]='v'
      this.dodajVrata(x/2+ 20*Math.sqrt(this.objekat.size*13/7)/2,y/2+20*Math.sqrt(this.objekat.size*7/13)-30,10,30,context)
    }
    else if (this.objekat.numR==2){
      const x1 = canvasEl.width - 40*Math.sqrt(this.objekat.size*13/14);
      const y1 = canvasEl.height- 20*Math.sqrt(this.objekat.size*7/26);

      const x2 = canvasEl.width;
      const y2 = canvasEl.height- 20*Math.sqrt(this.objekat.size*7/26);
    
      context.fillStyle = 'black';
      context.strokeRect(x1/2, y1/2, 20*Math.sqrt(this.objekat.size*13/14),20*Math.sqrt(this.objekat.size*7/26));
      this.dodajVrata(x1/2+ 20*Math.sqrt(this.objekat.size*13/14)/2,y1/2+20*Math.sqrt(this.objekat.size*7/26)-30,10,30,context)
      context.fillStyle = 'black';
      context.strokeRect(x2/2, y2/2, 20*Math.sqrt(this.objekat.size*13/14),20*Math.sqrt(this.objekat.size*7/26));
      this.dodajVrata(x2/2+ 20*Math.sqrt(this.objekat.size*13/14)/2,y2/2+20*Math.sqrt(this.objekat.size*7/26)-30,10,30,context)
      this.xCoord[0]=x1/2
      this.yCoord[0]=y1/2
      this.xLen[0]=20*Math.sqrt(this.objekat.size*13/14)
      this.yLen[0]=20*Math.sqrt(this.objekat.size*7/26)
      this.xDor[0]=x1/2+ 20*Math.sqrt(this.objekat.size*13/14)/2
      this.yDor[0]=y1/2+20*Math.sqrt(this.objekat.size*7/26)-30
      this.posDor[0]='v'
      this.xCoord[1]=x2/2
      this.yCoord[1]=y2/2
      this.xLen[1]=20*Math.sqrt(this.objekat.size*13/14)
      this.yLen[1]=20*Math.sqrt(this.objekat.size*7/26)
      this.xDor[1]=x2/2+ 20*Math.sqrt(this.objekat.size*13/14)/2
      this.yDor[1]=y2/2+20*Math.sqrt(this.objekat.size*7/26)-30
      this.posDor[1]='v'
      
    }
    else if (this.objekat.numR==3){
      const x1 = canvasEl.width - 40*Math.sqrt(0.25*this.objekat.size*13/7);
      const y1 = canvasEl.height- 40*Math.sqrt(0/25*this.objekat.size*7/13);

      const x2 = canvasEl.width;
      const y2 = canvasEl.height- 40*Math.sqrt(0.25*this.objekat.size*7/13);

      const x3 = canvasEl.width -20*Math.sqrt(0.5*this.objekat.size*13/7);
      const y3 = canvasEl.height;
    
      context.fillStyle = 'black';
      context.strokeRect(x1/2, y2/2, 20*Math.sqrt(0.25*this.objekat.size*13/7),20*Math.sqrt(0.25*this.objekat.size*7/13));
      this.dodajVrata(x1/2+ 20*Math.sqrt(0.25*this.objekat.size*13/7)/2,y2/2+20*Math.sqrt(0.25*this.objekat.size*7/13)-30,10,30,context)
      context.fillStyle = 'black';
      context.strokeRect(x2/2, y2/2, 20*Math.sqrt(0.25*this.objekat.size*13/7),20*Math.sqrt(0.25*this.objekat.size*7/13));
      this.dodajVrata(x2/2+ 20*Math.sqrt(0.25*this.objekat.size*13/7)/2,y2/2+20*Math.sqrt(0.25*this.objekat.size*7/13)-30,10,30,context)
      context.fillStyle = 'black';
      context.strokeRect(x3/2, y3/2, 20*Math.sqrt(this.objekat.size*13/14),20*Math.sqrt(this.objekat.size*7/26));
      this.dodajVrata(x3/2+ 20*Math.sqrt(this.objekat.size*13/14)/2,y3/2+20*Math.sqrt(this.objekat.size*7/26)-30,10,30,context)
      this.xCoord[0]=x1/2
      this.yCoord[0]=y2/2
      this.xLen[0]=20*Math.sqrt(0.25*this.objekat.size*13/7)
      this.yLen[0]=20*Math.sqrt(0.25*this.objekat.size*7/13)
      this.xDor[0]=x1/2+ 20*Math.sqrt(0.25*this.objekat.size*13/7)/2
      this.yDor[0]=y2/2+20*Math.sqrt(0.25*this.objekat.size*7/13)-30
      this.posDor[0]='v'
      this.xCoord[1]=x2/2
      this.yCoord[1]=y2/2
      this.xLen[1]=20*Math.sqrt(0.25*this.objekat.size*13/7)
      this.yLen[1]=20*Math.sqrt(0.25*this.objekat.size*7/13)
      this.xDor[1]=x2/2+ 20*Math.sqrt(0.25*this.objekat.size*13/7)/2
      this.yDor[1]=y2/2+20*Math.sqrt(0.25*this.objekat.size*7/13)-30
      this.posDor[1]='v'
      this.xCoord[2]=x3/2
      this.yCoord[2]=y3/2
      this.xLen[2]=20*Math.sqrt(this.objekat.size*13/14)
      this.yLen[2]=20*Math.sqrt(this.objekat.size*7/26)
      this.xDor[2]=x3/2+ 20*Math.sqrt(this.objekat.size*13/14)/2
      this.yDor[2]=y3/2+20*Math.sqrt(this.objekat.size*7/26)-30
      this.posDor[2]='v'
    }
  }
}
