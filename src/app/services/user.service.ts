import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from '../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Favorito } from '../interfaces/favorito.interface';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  

  private loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  
  public loggedIn$ = this.loggedInSubject.asObservable();

  crearUsuario(arg0: { nombre: any; email: any; telefono: any; direccion: any; ciudad: any; pais: any; codigo_postal: any; password: any; rol: string; }): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http.post<any>(`${environment.api_url}/crearusuario`, arg0, { headers })
      .pipe(
        map((res) => {
          if (res) {
            this.login(arg0.email, arg0.password).subscribe(() => {
              this.setLoginState(true);
              this.setUser(res);
            });
          }
          return res;
        })
      );
  }

  getUserPorEmail(email: any): Observable<any> {
    if (!email) {
      return of(null); // Return null if email is not provided
    }
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.get<any>(`${environment.api_url}/${email}`, { headers })
      .pipe(
        map((res) => {
          return res || null; // Return the user data or null if not found
        })
      );
  }

  constructor() { }
  http = inject(HttpClient);

  private readonly key = 'isLoggedIn';

  private readonly LOGIN_KEY = 'isLoggedIn';
  private readonly USER_KEY = 'user';

  private platformId = inject(PLATFORM_ID);

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  setLoginState(loggedIn: boolean): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.LOGIN_KEY, String(loggedIn));
      this.loggedInSubject.next(loggedIn);
    }
  }

  getLoginState(): boolean {
    if (this.isBrowser()) {
      const state = localStorage.getItem(this.LOGIN_KEY);
      return state === 'true';
    }
    return false;
  }

  setUser(user: any): void {
    if (this.isBrowser()) {
      console.log("Setting user in localStorage:", user);
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }
  }

  getUser(): any {
    if (this.isBrowser()) {
      const user = localStorage.getItem(this.USER_KEY);
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  isLoggedIn(): boolean {
    if (this.isBrowser()) {
      return localStorage.getItem(this.LOGIN_KEY) === 'true';
    }
    return false;
  }

  login(email: string, password: string): Observable<any> {
    let headers = new HttpHeaders();

    headers = headers.append(
      'Content-Type',
      'application/json'
    );

    return this.http.post<any>(`${environment.api_url}/login`, { email, password }, { headers })
      .pipe(
        map((res) => {
          if (res) {
            this.setLoginState(true);
            this.setUser(res);
          }
          return res;
        })
      );
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.LOGIN_KEY);
      localStorage.removeItem(this.USER_KEY);
      this.loggedInSubject.next(false);
    }
  }
}
