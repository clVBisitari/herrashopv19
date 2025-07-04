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


     private productos: Producto[] = [
    {
      id: 1,
      nombre: 'Mouse inalámbrico',
      descripcion: 'Mouse ergonómico con batería recargable',
      precio: 3500,
      stock: 12,
      imagen: 'https://via.placeholder.com/300x200?text=Mouse',
      clasificacion: ''
    },
    {
      id: 2,
      nombre: 'Teclado mecánico',
      descripcion: 'Teclado con switches azules y retroiluminación RGB',
      precio: 8700,
      stock: 0,
      imagen: 'https://via.placeholder.com/300x200?text=Teclado',
      clasificacion: ''
    },
    {
      id: 3,
      nombre: 'Monitor 24 pulgadas',
      descripcion: 'Monitor FHD 1080p de 75Hz',
      precio: 42999,
      stock: 7,
      imagen: 'https://via.placeholder.com/300x200?text=Monitor',
      clasificacion: ''
    }
  ];
    
    constructor() {}

    /* getProducto(id: number ): Observable<Producto> {
        let headers = new HttpHeaders();

      headers = headers.append(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    )

    return this.http.get<Producto>(`${environment.api_url}/productos/${id}`, 
        { headers })
        .pipe(
        map((res) => {
        return res;
      })
    ); */

getProducto(id: number): Observable<Producto | undefined> {
    const producto = this.productos.find(p => p.id === id);
    return of(producto);
  }

}
