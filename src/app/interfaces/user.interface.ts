export interface User {
  id: number;
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    telefono: string;
    direccion: string;
    ciudad: string;
    pais: string;
    codigo_postal: string;
    fecha_registro: Date;
    /*rol: 'admin' | 'user';
    estado: 'activo' | 'inactivo';
    token?: string; // Optional for authentication purposes
    imagen?: string; // Optional for user profile picture
    fecha_nacimiento?: Date; // Optional for user profile
    genero?: 'masculino' | 'femenino' | 'otro'; //
    // Optional for user profile
    preferencias?: {
        idioma: string; // Optional for user preferences
        notificaciones: boolean; // Optional for user preferences
    };
    historial_compras?: {
        producto_id: number; // ID of the purchased product
        fecha_compra: Date; // Date of purchase
        cantidad: number; // Quantity purchased
        total: number; // Total amount spent
    }[]; // Optional for user purchase history
    carrito?: {
        producto_id: number; // ID of the product in the cart
        cantidad: number; // Quantity of the product in the cart
    }[]; // Optional for user shopping cart
    direcciones_envio?: {
        direccion: string; // Shipping address
        ciudad: string; // City for shipping
        pais: string; // Country for shipping
        codigo_postal: string; // Postal code for shipping
    }[]; // Optional for user shipping addresses
    metodos_pago?: {
        tipo: 'tarjeta' | 'paypal' | 'transferencia'; // Payment method type
        detalles: string; // Details of the payment method (e.g., card number, PayPal email)
    }[]; // Optional for user payment methods
    fecha_ultimo_acceso?: Date; // Optional for user last access date
    preferencias_comunicacion?: {
        email: boolean; // Whether to receive emails
        sms: boolean; // Whether to receive SMS
        notificaciones_push: boolean; // Whether to receive push notifications
    }; // Optional for user communication preferences
    puntos_recompensa?: number; // Optional for user reward points
    comentarios?: {
        producto_id: number; // ID of the product commented on
        comentario: string; // User's comment
        fecha: Date; // Date of the comment
    }[]; // Optional for user comments on products
    */
}