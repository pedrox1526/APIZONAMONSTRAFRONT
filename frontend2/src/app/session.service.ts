import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpBackend,HttpClient
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  token: string;

  constructor(private http: HttpClient) { }

   authenticate() {

  
    this.http.get("http://localhost:3001/jwt").toPromise().then(token => {
      console.log(token);
       this.token = token as string;
    });

    return this.token;
  }

  getAuthorizationToken() {
    return this.token || "";
  }

  
}
