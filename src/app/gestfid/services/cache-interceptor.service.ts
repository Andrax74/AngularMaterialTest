import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';

import { CachingService } from './caching.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseURL } from '../app.constants';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CacheInterceptorService implements HttpInterceptor  {

  constructor(private cacheService: CachingService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(req.method !== 'GET') {

      console.log(`Invalidiamo la chache: ${req.method} ${req.url}`);

      this.cacheService.clearAll();
      return next.handle(req);
    }

    const cachedResponse: HttpResponse<any> = this.cacheService.getCache(req.url);

    if (cachedResponse) {
      console.log(`Otteniamo i dati dalla cache: ${cachedResponse.url}`);
      console.log(cachedResponse);

      return of(cachedResponse);
    }

    return next.handle(req)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {

            const Url = `${baseURL}/cerca/`;

            if (req.url.includes(Url)) {
              console.log(`Aggiungiamo i dati nella cache: ${req.url}`);
              this.cacheService.setCache(req.url, event, new Date());
            }
          }
        })
      );


  }
}
