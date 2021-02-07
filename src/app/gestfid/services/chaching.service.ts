import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChachingService {

  cache = new Map();
  expiry: number = 180; //secondi di validità della chache

  constructor() { }

  getChache(url: string) {

    let result = this.cache.get(url);

    if(result) {

      let response = result.response;
      let chacheDate = new Date(result.date).getTime();
      let currentDate = new Date().getTime()
      let diffSeconds = (currentDate - chacheDate) / 1000;

      return (diffSeconds) > this.expiry  ? this.deleteChache(url) : response;
    }
    else{ return null; }
  }

  setChache(url: string, response, date) {
    this.cache.set(url,{ response: response, date: date });
  }

  deleteChache(url: string) {

    this.cache.delete(url);
    return null;
  }

  clearAll() {
    this.cache.clear();
    return null;
  }



}
