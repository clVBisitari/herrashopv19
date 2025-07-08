import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    return this.http.get<Favorito[]>(`${environment.api_url}/favoritos`);
  }

  agregarFavorito(productoId: number): Observable<any> {
    return this.http.post(`${environment.api_url}/favoritos`, { productoId });
  }

  eliminarFavorito(id: number): Observable<any> {
    return this.http.delete(`${environment.api_url}/favoritos/${id}`);
  }
}
