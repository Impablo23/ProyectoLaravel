import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environmentsApi } from 'environments/environments';
import { Observable, retry } from 'rxjs';
import { Producto } from 'src/interfaces/producto.interface';
import { Venta } from 'src/interfaces/venta.interface';

@Injectable({
  providedIn: 'root',
})
export class TiendaServiceService {

  constructor(private http: HttpClient) { }

  public listadoProductos: Producto[] = [
    { id: 1, nombre_producto: 'Producto 1', precio_unidad: 10, stock: 100 },
    { id: 2, nombre_producto: 'Producto 2', precio_unidad: 20, stock: 50 },
    { id: 3, nombre_producto: 'Producto 3', precio_unidad: 30, stock: 10 },
  ];

  public ventas: Venta[] = [
    {
      id: 1,
      id_usuario: 15,
      estado_venta: 'finalizado',
      lista_productos: [{ id_producto: 1, cantidad: 3 }, { id_producto: 2, cantidad: 2 }],
      total: 70,
    },
    {
      id: 2,
      id_usuario: 15,
      estado_venta: 'finalizado',
      lista_productos: [{ id_producto: 2, cantidad: 1 }],
      total: 20,
    },
    {
      id: 3,
      id_usuario: 15,
      estado_venta: 'finalizado',
      lista_productos: [{ id_producto: 3, cantidad: 4 }],
      total: 120,
    },
    {
      id: 4,
      id_usuario: 15,
      estado_venta: 'finalizado',
      lista_productos: [{ id_producto: 1, cantidad: 5 }, { id_producto: 3, cantidad: 1 }],
      total: 60,
    },
    {
      id: 5,
      id_usuario: 15,
      estado_venta: 'finalizado',
      lista_productos: [{ id_producto: 1, cantidad: 2 }],
      total: 20,
    },
    {
      id: 6,
      id_usuario: 15,
      estado_venta: 'finalizado',
      lista_productos: [{ id_producto: 2, cantidad: 3 }],
      total: 60,
    },
    {
      id: 7,
      id_usuario: 15,
      estado_venta: 'finalizado',
      lista_productos: [{ id_producto: 3, cantidad: 2 }],
      total: 60,
    },
    {
      id: 8,
      id_usuario: 15,
      estado_venta: 'finalizado',
      lista_productos: [{ id_producto: 1, cantidad: 1 }, { id_producto: 2, cantidad: 1 }],
      total: 30,
    },
    {
      id: 9,
      id_usuario: 15,
      estado_venta: 'finalizado',
      lista_productos: [{ id_producto: 2, cantidad: 2 }, { id_producto: 3, cantidad: 1 }],
      total: 70,
    },
    {
      id: 10,
      id_usuario: 15,
      estado_venta: 'curso',  // This sale is still "in progress"
      lista_productos: [{ id_producto: 1, cantidad: 4 }, { id_producto: 3, cantidad: 1 }],
      total: 0,
    },
  ];

  private url: string = environmentsApi.baseUrl;

  // --------------------------------------------------------------------------------------------
  // ----------------------------------------PRODUCTOS-------------------------------------------
  // --------------------------------------------------------------------------------------------

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.url}/producto/all`);
  }

  addProducto(producto: Producto): Observable<string> {
    return this.http.post<string>(`${this.url}/producto/add`, producto);
  }
  editProducto(producto: Producto): Observable<string> {
    return this.http.put<string>(`${this.url}/producto/edit`, producto);
  }
  deleteProducto(id: number): Observable<string> {
    return this.http.delete<string>(`${this.url}/producto/delete/${id}`);
  }

  getProductoById(id: number): Observable<Producto> {
    return this.http.get<Producto>((`${this.url}/producto/${id}`));
  }

  // --------------------------------------------------------------------------------------------
  // ---------------------------------------VENTAS-----------------------------------------------
  // --------------------------------------------------------------------------------------------

  getVentaCurso(id_usuario: number): Observable<Venta> {
    return this.http.get<Venta>((`${this.url}/venta/curso/${id_usuario}`));
  }
  getVentaFinalizada(): Observable<Venta[]> {
    return this.http.get<Venta[]>((`${this.url}/venta/finalizada`));
  }

  addVenta(venta: Venta): Observable<string> {
    return this.http.post<string>(`${this.url}/venta/add`, venta);
  }

  editVenta(venta: Venta): Observable<string> {
    return this.http.put<string>(`${this.url}/venta/edit`, venta);
  }

  deleteVenta(id: number): Observable<string> {
    return this.http.delete<string>(`${this.url}/venta/delete/${id}`);
  }


}
