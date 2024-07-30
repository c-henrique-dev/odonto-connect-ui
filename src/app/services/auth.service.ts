import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { Login } from '../models/login.model';
import { HttpBaseService } from './http-base.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends HttpBaseService {
  private subjectUsuario: BehaviorSubject<any> = new BehaviorSubject(null);
  private subjectLogin: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private readonly endpoint = 'api';

  constructor(
    protected override readonly injector: Injector,
    private router: Router
  ) {
    super(injector);
  }

  login(login: Login): Observable<void> {
    return this.httpPost(`${this.endpoint}/login`, login).pipe(
      map((response) => {
        sessionStorage.setItem('token', response.data.token);
        const decodificado = this.decodeToken(response.data.token);
        this.subjectUsuario.next(decodificado);
        this.subjectLogin.next(true);
      })
    );
  }

  sair() {
    sessionStorage.removeItem('token');
    this.subjectUsuario.next(null);
    this.subjectLogin.next(false);
    this.router.navigate(['login']);
  }

  usuarioEstaLogado(): Observable<boolean> {
    if (typeof sessionStorage !== 'undefined') {
      const token = sessionStorage.getItem('token');
      
      if (token) {
        const tokenInfo = this.decodeToken(token);
        const isTokenExpired = tokenInfo.exp < Date.now() / 1000;
  
        if (isTokenExpired) {
          this.sair();
        } else {
          this.subjectLogin.next(true);
        }
      }
    }
  
    return this.subjectLogin.asObservable();
  }
  

  private decodeToken(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64));
  }
}