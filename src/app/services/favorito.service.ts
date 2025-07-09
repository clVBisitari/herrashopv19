import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Favorito } from '../interfaces/favorito.interface';
import { environment } from '../environments/environments';
import { map, Observable } from 'rxjs';
import { UserService } from './user.service';
import { inject } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class FavoritoService {
  
  private readonly FAVORITOS_KEY = 'favoritos';
  constructor(private http: HttpClient, private userService:UserService) {}
  

  getFavoritos(): Observable<Favorito[]> {
    const usuarioId = Number(this.userService.getUser()?.id || localStorage.getItem('usuarioId'));
    return this.http.get<Favorito[]>(`${environment.api_url}/favoritos/usuario/${usuarioId}`);
  }

  agregarFavorito(productoId: number): Observable<any> {
    const usuarioId = Number(this.userService.getUser()?.id || localStorage.getItem('usuarioId'));
    let fav =  this.http.post(`${environment.api_url}/favoritos`, { usuarioId, productoId });
    fav.pipe(
      map((res) => {
        if (res) {
          const favoritos = JSON.parse(localStorage.getItem(this.FAVORITOS_KEY) || '[]');
          favoritos.push(res);
          localStorage.setItem(this.FAVORITOS_KEY, JSON.stringify(favoritos));
          console.log("Favorito agregado al LS:", res);
        }
        return res;
      })
    ).subscribe();
    return fav;
  }

  eliminarFavorito(productoId: number): Observable<any> {
    const usuarioId = Number(this.userService.getUser()?.id || localStorage.getItem('usuarioId'));
    return this.http.delete(`${environment.api_url}/favoritos`, {
      params: {
        usuarioId,
        productoId
      }
    });
  }
}