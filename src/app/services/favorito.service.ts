import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Favorito } from '../interfaces/favorito.interface';
import { environment } from '../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritoService {
  constructor(private http: HttpClient) {}

  getFavoritos(): Observable<Favorito[]> {
    const usuarioId = Number(localStorage.getItem('usuarioId'));
    return this.http.get<Favorito[]>(${environment.api_url}/favoritos/usuario/${usuarioId});
  }

  agregarFavorito(productoId: number): Observable<any> {
    const usuarioId = Number(localStorage.getItem('usuarioId'));
    return this.http.post(${environment.api_url}/favoritos, { usuarioId, productoId });
  }

  eliminarFavorito(productoId: number): Observable<any> {
    const usuarioId = Number(localStorage.getItem('usuarioId'));
    return this.http.delete(${environment.api_url}/favoritos, {
      params: {
        usuarioId,
        productoId
      }
    });
  }
}