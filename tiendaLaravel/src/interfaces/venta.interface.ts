import { ListaProductos } from "./listaProducto.interface";

export interface Venta {
    id: number;
    id_usuario: number;
    lista_productos: ListaProductos[];
    total: number;
}