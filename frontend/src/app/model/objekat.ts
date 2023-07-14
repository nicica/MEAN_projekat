
export class Room{
    
    constructor(newX:number,newY:number,newH:number,newW:number){
        this.x=newX
        this.y=newY
        this.height=newH
        this.width=newW
    }

    x:number
    y:number
    height: number
    width: number


    Validate(other: Room){

    }
}
export class Objekat{
    _id:string
    tip: string=""
    address: string
    numR: number
    size: number
   // rooms:Room[]
   vlasnik: string
   skica: string


}