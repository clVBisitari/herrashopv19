import express, { Router } from 'express';
import cors from 'cors';
import { productoRouter } from '../routes/producto/producto.routes';

interface Options {
  port: number;
  routes: Router;
}

export class Server {
  private app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, routes } = options;
    this.port = port;
    this.routes = routes;
  }

    async start() {

        this.app.use(express.json())
        this.app.use(express.urlencoded({extended : true}))

        this.app.use(cors())
        
        this.app.use('/api',this.routes);

        this.app.listen(this.port, ()=>{
            console.log("Servidor corriendo en el puerto " + this.port + " desde el directorio " + process.cwd());
        })
     }
}
