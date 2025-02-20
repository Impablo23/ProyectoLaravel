import { ListaProductos } from "./listaProducto.interface";

export interface Venta {
    id: number;
    id_usuario: number;
    estado_venta: 'finalizado' | 'curso';
    lista_productos: ListaProductos[];
    total: number;
}