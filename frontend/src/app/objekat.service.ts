import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ObjekatService {

  constructor(private http: HttpClient) { }
  save(tipFromForm,addressFromForm,numRFromForm,sizeFromForm,ownerFromForm,skicaFormForm,skicaDataFF ){
    const data = {
      tip: tipFromForm,
      address: addressFromForm,
      numR: numRFromForm,
      size: sizeFromForm,
      owner: ownerFromForm,
      skica: skicaFormForm,
      skicaData:skicaDataFF

    }
    
    return this.http.post('http://localhost:4000/objects/save', data)
  }
  getAllObjekti(){
    
    return this.http.get(`http://localhost:4000/objects/getAllObjects`)
  }
  deleteObjekat(idFf){
    const data = {
      id: idFf
    }
    return this.http.post(`http://localhost:4000/objects/deleteObject`,data)
  }
  change(tipFromForm,addressFromForm,numRFromForm,sizeFromForm,idFF,skicaFF,contentFF){
    const data = {
      tip: tipFromForm,
      address: addressFromForm,
      numR: numRFromForm,
      size: sizeFromForm,
      id: idFF,
      skica: skicaFF,
      content:contentFF
    }
    return this.http.post(`http://localhost:4000/objects/changeInfo`,data)
  }
  improve(idFF,skicFF,contFF){
    const data={
      id:idFF,
      skica:skicFF,
      content:contFF
    }
    return this.http.post(`http://localhost:4000/objects/ren`,data)
  }
}
