import { Request, Response } from 'express';
import { ProductoService } from '../service/producto.service';
import { ProductoRepository } from '../repository/producto.repository';

export class ProductoController {
    private productoService: ProductoService;

    constructor() {
        const productoRepository = new ProductoRepository();
        this.productoService = new ProductoService(productoRepository);
    }

    public getAllProductos = async (req: Request, res: Response) => {
        try {
            const productos = await this.productoService.obtenerTodosLosProductos();
            res.status(200).json(productos);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error al obtener los productos', error });
        }
    }

    public getProducto = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);

            if (isNaN(id)) {
                return res.status(400).json({ message: 'ID inválido' });
            }

            const producto = await this.productoService.obtenerProductoPorId(id);

            console.log(producto);

            if (!producto) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }

            res.status(200).json(producto);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error al obtener el producto', error });
        }
    }
    public crearProducto = async (req: Request, res: Response) => {
        try {
            const {
                nombre,
                descripcion,
                clasificacion,
                precio,
                stock,
                imagen
            } = req.body;
            if (!nombre || !descripcion || !clasificacion || !precio || !stock || !imagen) {
                return res.status(400).json({ message: 'Faltan datos para crear el producto' });
            }

            const nuevoProductoData = {
                nombre,
                descripcion,
                clasificacion,
                precio,
                stock,
                imagen
            };
            const nuevoProducto = await this.productoService.crearProducto(nuevoProductoData);
            res.status(201).json(nuevoProducto);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error al crear el producto', error });
        }
    }
}