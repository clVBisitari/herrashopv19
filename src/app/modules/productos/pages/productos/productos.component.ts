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
import { FavoritoService } from '../../../../services/favorito.service';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SliderModule } from 'primeng/slider';

@Component({
  selector: 'app-productos',
  imports: [DataView, ButtonModule, Tag, CommonModule, SelectModule, FormsModule, PaginatorModule, RouterOutlet, RouterLink, TooltipModule, DialogModule, InputSwitchModule, SliderModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
  providers: [ProductoService, PaginatorModule]
})
export class ProductosComponent {
  constructor(public router: Router) { }

  productoService = inject(ProductoService);
  carritoService = inject(CarritoService);
  favoritoService = inject(FavoritoService);

  products = signal<any>([]);
  favoritos = signal<Set<number>>(new Set());


  items: any[] = [];
  totalRecords: number = 0;
  rowsPerPageOptions: number[] = [5, 10, 20];
  rowsPerPage: number = 10;
  paginatorFirst: number = 0;
  paginatorRows: number = 10;
  first: any;
  rows: any;
  modalVisible: boolean = false;
  filtroNombre: string = '';
  filtroDescripcion: string = '';
  filtroPrecioMin: number | null = null;
  filtroPrecioMax: number | null = null;
  productosOriginal: any[] = [];
  filtroStock: boolean = false;
  filtroRangoPrecio: [number, number] = [0, 10000];
  precioMinimoAbsoluto: number = 0;
  precioMaximoAbsoluto: number = 10000;
  esAdmin: boolean = false;


  nuevoProducto = {
    nombre: '',
    descripcion: '',
    clasificacion: '',
    precio: 0,
    stock: 0,
    imagen: ''
  };

  sortField: string;
  sortOrder: unknown;
  sortOptions: any[];
  sortKey: any;


  ngOnInit() {
    this.productoService.getProductos().subscribe((data) => {
      this.products.set([...data]);
      this.favoritoService.getFavoritos().subscribe((favoritos) => {
        const ids = favoritos.map((f) => f.productoId);
        this.favoritos.set(new Set(ids));
      });
      this.productosOriginal = data;
      const rol = localStorage.getItem('userRol');
      this.esAdmin = rol === 'admin';
      const precios = data.map(p => p.precio);
      this.precioMinimoAbsoluto = Math.min(...precios);
      this.precioMaximoAbsoluto = Math.max(...precios);
      this.filtroRangoPrecio = [this.precioMinimoAbsoluto, this.precioMaximoAbsoluto];

      const filtrosGuardados = localStorage.getItem('filtrosProductos');
      if (filtrosGuardados) {
        const filtros = JSON.parse(filtrosGuardados);
        this.filtroNombre = filtros.nombre || '';
        this.filtroDescripcion = filtros.descripcion || '';
        this.filtroStock = filtros.stock || false;
        this.filtroRangoPrecio = filtros.rangoPrecio || [this.precioMinimoAbsoluto, this.precioMaximoAbsoluto];
      }
    
      this.filtrarProductos(); 
    });
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

  agregarAlCarrito(producto: Producto) {
    console.log('agregando produ al carrito:', producto);
    this.carritoService.agregarAlCarrito(producto, 1);
    alert(`Producto ${producto.nombre} agregado al carrito`);
  }

  abrirModal() {
    this.modalVisible = true;
  }

  guardarProducto() 
  {
    const productoConRol = 
    {
    ...this.nuevoProducto,
    rol: localStorage.getItem('userRol') // es adm o no ? 
    };
    this.productoService.crearProducto(productoConRol).subscribe({
      next: () => {
        this.modalVisible = false;
        this.nuevoProducto = {
          nombre: '',
          descripcion: '',
          clasificacion: '',
          precio: 0,
          stock: 0,
          imagen: ''
        };
        alert(' Producto creado correctamente');
        this.recargarProductos();
      },
      error: (err) => {
        console.error('Error al guardar producto:', err);
        alert('❌ Error al guardar producto');
      }
    });
  }
  onPageChange($event) {
    console.log('Page changed:', $event);
  }


  recargarProductos() {
    this.productoService.getProductos().subscribe((data) => {
      this.products.set([...data]);
      this.productosOriginal = data;
      this.filtrarProductos(); 
    });
  }



  filtrarProductos() {
    let filtrados = [...this.productosOriginal];

    if (this.filtroNombre.trim()) {
      filtrados = filtrados.filter(p =>
        p.nombre.toLowerCase().includes(this.filtroNombre.trim().toLowerCase())
      );
    }

    if (this.filtroDescripcion.trim()) {
      filtrados = filtrados.filter(p =>
        p.descripcion.toLowerCase().includes(this.filtroDescripcion.trim().toLowerCase())
      );
    }

    // Filtro de stock
    if (this.filtroStock) {
      filtrados = filtrados.filter(p => p.stock > 0);
    }

    // Filtro por slider de precio
    const [minPrecio, maxPrecio] = this.filtroRangoPrecio;
    filtrados = filtrados.filter(p => p.precio >= minPrecio && p.precio <= maxPrecio);

    this.products.set(filtrados);
    localStorage.setItem('filtrosProductos', JSON.stringify({
      nombre: this.filtroNombre,
      descripcion: this.filtroDescripcion,
      stock: this.filtroStock,
      rangoPrecio: this.filtroRangoPrecio
    }));
  }

  limpiarFiltros() {
    this.filtroNombre = '';
    this.filtroDescripcion = '';
    this.filtroStock = false;
    this.filtroRangoPrecio = [this.precioMinimoAbsoluto, this.precioMaximoAbsoluto];

    localStorage.removeItem('filtrosProductos');
    this.filtrarProductos();
  }

  toggleFavorito(productoId: number) {
  const actuales = new Set(this.favoritos());
  const yaEsFavorito = actuales.has(productoId);

  if (yaEsFavorito) {
    this.favoritoService.eliminarFavorito(productoId).subscribe(() => {
      actuales.delete(productoId);
      this.favoritos.set(actuales);
    });
  } else {
    this.favoritoService.agregarFavorito(productoId).subscribe(() => {
      actuales.add(productoId);
      this.favoritos.set(actuales);
      localStorage.setItem('favoritos', JSON.stringify([...actuales]));
    });
  }
}

  esFavorito(productoId: number): boolean {
    console.log('Verificando si es favorito:', productoId);
    let estaEnFav =  this.favoritos().has(productoId);
    console.log('Resultado de verificación:', estaEnFav);
    return estaEnFav;
  }
}
