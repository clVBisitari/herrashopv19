import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from '../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
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
    }
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
            localStorage.setItem(this.LOGIN_KEY, 'true');
          }
          return res;
        })
      );
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.LOGIN_KEY);
      localStorage.removeItem(this.USER_KEY);
    }
  }
}
