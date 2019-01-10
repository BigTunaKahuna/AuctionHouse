import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpHeaderResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface TokenResponse {
  access_token: string,
  expires_in: number,
  token_type:"Bearer"
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public login(user, password) {
    const body = new HttpParams()
      .set("grant_type", "password")
      .set("client_id", "my-app")
      .set("client_secret", "secret")
      .set("scope", "my-api")
      .set('username', user)
      .set('password', password);

    const options = {
      headers: new HttpHeaders()
        .set('Content-type', 'application/x-www-form-urlencoded')
    }

    return this.http.post<TokenResponse>("http://localhost:5000/connect/token", body, options)
      .pipe(map(x => x.access_token));
  }

  constructor(private http:HttpClient) { }
}
