import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, CarouselModule],
  template: `
    
    <!-- Carrusel -->
    <p-carousel [value]="imagenes" [numVisible]="1" [circular]="true" [autoplayInterval]="3000">
      <ng-template pTemplate="item" let-img>
        <div class="w-full max-h-[800px] overflow-hidden flex justify-center items-center">
      <img 
        [src]="img.imagen" 
        [alt]="img.titulo" 
        class="max-w-full max-h-[800px] object-contain rounded-lg shadow" 
      />
    </div>
        <div class="text-center mt-2 text-lg font-semibold text-white bg-black bg-opacity-50 rounded py-1">
          {{ img.titulo }}
        </div>
      </ng-template>
    </p-carousel>
  `
})
export class HomeComponent {
  imagenes = [
    { imagen: '/imagenes/assets/banner1.png', titulo: 'Ofertas de verano' },
    { imagen: '/imagenes/assets/banner2.png', titulo: 'Nuevos Ingresos' },
    { imagen: '/imagenes/assets/banner3.png', titulo: 'Herramientas con descuento' }
  ];
}
