import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZahtevService {

  constructor(private http: HttpClient) { }

  newR(usUserFF,usernameFF, nameFF,idFF,sDFF,eDFF){
    const data = {
      usernameIs:usUserFF,
      username: usernameFF,
      agencyName: nameFF,
      id: idFF,
      startDate: sDFF,
      endDate: eDFF,
      phase: "poslat",
      placen: false
    }

    return this.http.post('http://localhost:4000/zahtevi/newR', data)
  }
  getAllZahtevi(){
    
    return this.http.get(`http://localhost:4000/zahtevi/getAll`)
  }
  brisi(idFF){
    const data={
      id:idFF
    }
    return this.http.post('http://localhost:4000/zahtevi/delete', data)
  }
  aktiviraj(idFF){
    const data={
      id:idFF
    }
    return this.http.post('http://localhost:4000/zahtevi/aktiviraj', data)
  }
  plati(idFF){
    const data={
      id:idFF
    }
    return this.http.post('http://localhost:4000/zahtevi/pay', data)
  }
  odgovori(idFF,stFF,sumFF){
    const data={
      id:idFF,
      st:stFF,
      suma:sumFF
    }
    return this.http.post('http://localhost:4000/zahtevi/answer', data)
  }
  zavrsi(idFF){
    const data={
      id:idFF
    }
    return this.http.post('http://localhost:4000/zahtevi/zavrsi', data)
  }
  otkazi(idFF){
    const data={
      id:idFF
    }
    return this.http.post('http://localhost:4000/otkazi/dodaj', data)
  }
  getAllOtkazi(){
    
    return this.http.get('http://localhost:4000/otkazi/getAll')
  }
  promeni(idFF,ishodFF,idObjFF){
    const data={
      id:idFF,
      odg:ishodFF,
      idPos:idObjFF
    }
    return this.http.post('http://localhost:4000/otkazi/promena', data)
  }
  otkaziPosao(idFF){
    const data={
      id:idFF
    }
    return this.http.post('http://localhost:4000/zahtevi/otkazi', data)
  }

}
