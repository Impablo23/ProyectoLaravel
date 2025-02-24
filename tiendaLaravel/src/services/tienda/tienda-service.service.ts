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

  getVentaCurso(id_usuario: number): Observable<Venta[]> {
    return this.http.get<Venta[]>((`${this.url}/venta/curso/${id_usuario}`));
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
