import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Producto } from '../interfaces/producto.interface';
import { environment } from '../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  http = inject(HttpClient);



  constructor() { }

  getProducto(id: number): Observable<Producto> {
    let headers = new HttpHeaders();

    /*headers = headers.append(
    'Authorization',
    'Bearer ' + localStorage.getItem('token')
  )*/

    return this.http.get<Producto>(`${environment.api_url}/productos/${id}`,
      { headers })
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
