import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';

import { ChachingService } from './chaching.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CacheInterceptorService implements HttpInterceptor  {

  constructor(private cacheService: ChachingService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(req.method !== 'GET') {

      console.log(`Invalidiamo la chache: ${req.method} ${req.url}`);

      this.cacheService.clearAll();
      return next.handle(req);
    }

    const cachedResponse: HttpResponse<any> = this.cacheService.getChache(req.url);

    if (cachedResponse) {
      console.log(`Otteniamo i dati dalla chache: ${cachedResponse.url}`);
      console.log(cachedResponse);

      return of(cachedResponse);
    }

    return next.handle(req)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            console.log(`Aggiungiamo i dati nella cache: ${req.url}`);

            this.cacheService.setChache(req.url, event, new Date());
          }
        })
      );


  }
}
