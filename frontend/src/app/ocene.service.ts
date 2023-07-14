import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OceneService {

  constructor(private http: HttpClient) { }
  getAll(){
    
    return this.http.get(`http://localhost:4000/ocene/getAll`)
  }
  addOne(idK,imekor,przKor,komm,ocenaFF,idP){
    const data = {
      komentar:komm,
      ocena: ocenaFF,
      idAg: idK,
      ime: imekor,
      prezime: przKor,
      idPos: idP
    }

    return this.http.post('http://localhost:4000/ocene/nova', data)
  }
  update(komm,ocenaFF,idK){
    const data = {
      komentar:komm,
      ocena: ocenaFF,
      id: idK
    }

    return this.http.post('http://localhost:4000/ocene/promena', data)
  }
}
