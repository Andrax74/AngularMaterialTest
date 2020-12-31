import { HttpClient } from '@angular/common/http';
import { IUsers } from '../models/interfaces';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  loadAll() {

    const userUrl = "https://angular-material-api.azurewebsites.net/users";

    return this.httpClient.get<IUsers[]>(userUrl);

  }

}
