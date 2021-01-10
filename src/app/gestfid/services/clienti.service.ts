import { IClienti, IClienti2 } from '../Models/interfaces';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from '../app.constants';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ClientiService {

  constructor(private httpClient: HttpClient) { }

  getAll() {

    const Url = `${baseURL}/cerca/`;

    return this.httpClient.get<IClienti[]>(Url);
  }

  getByCodFid(codfid : string) {

    const Url = `${baseURL}/cerca/codice/${codfid}`;

    return this.httpClient.get<IClienti>(Url)
      .pipe(map(data => this.convertDataClienti(data)));

  }

  private convertDataClienti(data: IClienti): IClienti2 {

    return {
      codFid: data.codFid,
      nominativo: data.nominativo,
      comune: data.comune,
      idAvatar: data.idAvatar,
      stato: (data.stato > 0) ? 'Attivo' : 'Non Attivo',
      bollini: data.transazioni.map(a => a.bollini).reduce((a,c)=>a+c),
      spese: data.transazioni.length,
      dataSpesa: new Date(Math.max.apply(null, data.transazioni.map(function(e) {
        return new Date(e.data);
      })))
    }

  }
}
