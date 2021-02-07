import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { IClienti, IClienti2 } from '../Models/interfaces';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseURL } from '../app.constants';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResponseInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`Log Response - ${req.url}`);

    const Url = `${baseURL}/cerca/codice/`;

  return next.handle(req)
    .pipe(map((event: HttpEvent<any>) => {
    if (event instanceof HttpResponse &&  req.url.includes(Url)) {
        return event.clone({ body: this.convertDataClienti(event.body) });
  }

  return event;
  }));

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
