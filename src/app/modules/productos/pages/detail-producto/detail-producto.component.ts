import { Component, inject, OnDestroy, OnInit } from '@angular/core';
<<<<<<<< HEAD:src/app/modules/productos/pages/detail-producto/detail-producto.component.ts
import { ProductoService } from '../../../../services/producto.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Producto } from '../../../../interfaces/producto.interface';
import { CommonModule } from '@angular/common';
========
import { ProductoService } from '../services/producto.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Producto } from '../interfaces/producto.interface';
import { BrowserModule } from '@angular/platform-browser';
>>>>>>>> 3a9e2215e1c48069219e28e46cc4a22a92bddffe:src/app/detail-producto/detail-producto.component.ts
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-detail-producto',
<<<<<<<< HEAD:src/app/modules/productos/pages/detail-producto/detail-producto.component.ts
  imports: [CommonModule,
========
  imports: [BrowserModule,
>>>>>>>> 3a9e2215e1c48069219e28e46cc4a22a92bddffe:src/app/detail-producto/detail-producto.component.ts
    FormsModule,
    CardModule,
    ButtonModule,
    BadgeModule,
    TagModule,
    RouterLink
  ],
  templateUrl: './detail-producto.component.html',
  styleUrl: './detail-producto.component.css'
})
export class DetailProductoComponent implements OnInit, OnDestroy{
  productoService = inject(ProductoService); 

  activatedRouter = inject(ActivatedRoute);

  id: number | null = null;

  producto: Producto | undefined;

  ngOnInit() {
    this.id = Number(this.activatedRouter.snapshot.paramMap.get('id'))
    this.getProducto();  
  }

  ngOnDestroy(): void {
    
  }

  getProducto() {
    if (this.id !== null) {
      this.productoService.getProducto(this.id).subscribe(
        {
          next : (data)=>{
            this.producto = data;
            console.log(data);
          }, 

<<<<<<<< HEAD:src/app/modules/productos/pages/detail-producto/detail-producto.component.ts
        error: (err) => {
          console.error('Error al cargar producto:', err);
        },

        complete: () => {}
      }
    );
    } else {
      console.error('ID de producto no válido');
========
          error: (err) => {},

          complete: () => {}
        }
      );
    } else {
      console.error('El id del producto es null');
>>>>>>>> 3a9e2215e1c48069219e28e46cc4a22a92bddffe:src/app/detail-producto/detail-producto.component.ts
    }
  }
}