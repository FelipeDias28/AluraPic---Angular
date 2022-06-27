import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Subject } from 'rxjs';
import { TokenService } from './../token/token.service';
import { User } from './user';

@Injectable({
  providedIn: "root"
})
export class UserService {
  private userSubject = new Subject<User>();

  constructor(
    private tokenService: TokenService
  ) {
    this.tokenService.hasToken() && this.decodeAndNotify();
  }

  setToken(token: string) {
    this.tokenService.setToken(token);
    this.decodeAndNotify();
  }

  getUser() {
    // quem chamar esse método consegue se inscrever nele
    return this.userSubject.asObservable();
  }

  // Ninguem fora dessa classe por chamar esse método
  private decodeAndNotify() {
    const token = this.tokenService.getToken();

    // decodifica o token e opega o valor do payload
    const user = jwt_decode(token) as User;
    this.userSubject.next(user);
  }
}
