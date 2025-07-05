import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Producto } from '../interfaces/producto.interface';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})

export class ProductoService {
    http = inject(HttpClient);

    
    
    constructor() {}

     getProducto(id: number ): Observable<Producto> {
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

/*getProducto(id: number): Observable<Producto | undefined> {
    const producto = this.productos.find(p => p.id === id);
    return of(producto);
  }*/

}
}
