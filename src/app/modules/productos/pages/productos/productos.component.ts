import { Component, inject, signal } from '@angular/core';
import { ProductoService } from '../../../../services/producto.service';
import { DataView } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { Producto } from '../../../../interfaces/producto.interface';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CarritoService } from '../../../../services/carrito.service';
import { PaginatorModule } from 'primeng/paginator';
import { Router, RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-productos',
  imports: [DataView, ButtonModule, Tag, CommonModule, SelectModule, FormsModule, PaginatorModule, RouterOutlet, RouterLink],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
  providers: [ProductoService, PaginatorModule]
})
export class ProductosComponent {
 constructor(public router: Router){}

  items: any[] = [];
  totalRecords: number = 0;
  rowsPerPageOptions: number[] = [5, 10, 20];
  rowsPerPage: number = 10;
  paginatorFirst: number = 0;
  paginatorRows: number = 10;
  first: any;
  rows: any;

  onSortChange($event: SelectChangeEvent) {

    this.sortField = $event.value;
    if (this.sortField) {
      this.products.set([...this.products().sort((a, b) => {
        let valueA = a[this.sortField];
        let valueB = b[this.sortField];
        if (typeof valueA === 'string') {
          valueA = valueA.toLowerCase();
          valueB = valueB.toLowerCase();
        }
        return (valueA < valueB ? -1 : 1) * (this.sortOrder === 'asc' ? 1 : -1);
      })]);
    }
  }
  products = signal<any>([]);

  productoService = inject(ProductoService);
  carritoService = inject(CarritoService);
  sortField: string;
  sortOrder: unknown;
  sortOptions: any[];
  sortKey: any;

  ngOnInit() {
    this.productoService.getProductos().subscribe((data) => {
      const d = data.slice(0, 20);
      this.products.set([...d])
    });
    this.sortOptions = [
      { label: 'Menor precio a mayor', value: '!precio' },
      { label: 'Mayor precio a menor', value: 'precio' },
    ];
  }

  getSeverity(producto: Producto) {
    if (producto.stock > 10) {
      return 'success';
    } else if (producto.stock > 0 && producto.stock <= 10) {
      return 'warn';
    } else if (producto.stock === 0) {
      return 'danger';
    } else {
      return null;
    }
  }

  agregarAlCarrito(producto: Producto) {
    console.log('agregando produ al carrito:', producto);
    this.carritoService.agregarAlCarrito(producto, 1);
    alert(`Producto ${producto.nombre} agregado al carrito`);
  }

  onPageChange($event) {
    console.log('Page changed:', $event);
    // Aquí puedes manejar el cambio de página si es necesario
  }

  
}
