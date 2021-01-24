import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IClienti, IClienti2, IMessage } from '../Models/interfaces';
import { catchError, concatMap, delay, map, retry, retryWhen, take } from 'rxjs/operators'

import { Injectable } from '@angular/core';
import { baseURL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class ClientiService {

  private _clienti: BehaviorSubject<IClienti[]>;

  private dataStore: {
    clienti: IClienti[];
  }

  constructor(private httpClient: HttpClient) {
    this.dataStore = { clienti: [] };
    this._clienti = new BehaviorSubject<IClienti[]>([]);
  }

  insCliente(cliente: IClienti) {

    const Url = `${baseURL}/inserisci`;

    this.httpClient.post<IMessage>(Url, cliente)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {

          cliente = null;
          console.log(error);
        }
      )

      return new Promise((resolver, reject) => {

        if (cliente != null)
        {
          var removeIndex =  this.dataStore.clienti.map(item => item.codFid).indexOf(cliente.codFid);
          ~removeIndex && this.dataStore.clienti.splice(removeIndex, 1);

          this.dataStore.clienti.push(cliente);
          this.dataStore.clienti.sort((a, b) => (a.nominativo > b.nominativo) ? 1 : -1)
          this._clienti.next(Object.assign({}, this.dataStore).clienti);
        }

        resolver(cliente);
      })
  }

  delCliente(codFid: String) {

    const Url = `${baseURL}/elimina/${codFid}`;

    this.httpClient.delete<IMessage>(Url)
    .pipe(catchError(this.handleError))
    .subscribe(
      response => {
        console.log(response);
        this.getAll();
      }
    )

  }

  handleError(error: HttpErrorResponse) {

    let errorMessage = 'Errore Sconosciuto!';

    let errore: IMessage;
    errore = error.error;

    if (error.error instanceof ErrorEvent) {

      errorMessage = `Errore: ${error.error.message}`;

    }
    else {
      errorMessage = errore.messaggio;
    }

    if (errore.messaggio)
      window.alert(errorMessage);

    return throwError(error);

  }

  getAll() {

    const Url = `${baseURL}/cerca/`;

    return this.httpClient.get<IClienti[]>(Url)
      .pipe(
        //retry(3)
        retryWhen(errors => errors.pipe(delay(2000), take(3))),
        )
      .subscribe(data => {
        this.dataStore.clienti = data;
        console.log(data);

        this._clienti.next(Object.assign({}, this.dataStore).clienti);
      })
  }

  get clienti(): Observable<IClienti[]> {
    return this._clienti.asObservable();
  }

  getByCodFid(codfid : string) {

    const Url = `${baseURL}/cerca/codice/${codfid}`;

    return this.httpClient.get<IClienti>(Url)
      .pipe(map(data => this.convertDataClienti(data)));

  }

  getByCodFid2(codfid : string) {

    const Url = `${baseURL}/cerca/codice/${codfid}`;

    return this.httpClient.get<IClienti>(Url);

  }

  private convertDataClienti(data: IClienti): IClienti2 {

    return {
      codFid: data.codFid,
      nominativo: data.nominativo,
      comune: data.comune,
      idAvatar: data.idAvatar,
      stato: (data.stato > 0) ? 'Attivo' : 'Non Attivo',
      bollini: (data.transazioni.length > 0) ? data.transazioni.map(a => a.bollini).reduce((a,c)=>a+c) : 0,
      spese: (data.transazioni.length > 0) ? data.transazioni.length : 0,
      dataSpesa: (data.transazioni.length > 0) ? new Date(Math.max.apply(null, data.transazioni.map(function(e) {
        return new Date(e.data);
      }))) : new Date('1900-01-01'),
      transazioni: data.transazioni
    }

  }
}
