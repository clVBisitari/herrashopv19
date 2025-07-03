import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductoService } from '../../../../services/producto.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Producto } from '../../../../interfaces/producto.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-detail-producto',
  imports: [CommonModule,
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

        error: (err) => {
          console.error('Error al cargar producto:', err);
        },

        complete: () => {}
      }
    );
    } else {
      console.error('ID de producto no válido');
    }
  }
}