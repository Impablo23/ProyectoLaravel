import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environmentsApi } from 'environments/environments';
import { Observable, retry } from 'rxjs';
import { Producto } from 'src/interfaces/producto.interface';

@Injectable({
  providedIn: 'root',
})
export class TiendaServiceService {

  constructor(private http: HttpClient) {}

  private url: string = environmentsApi.baseUrl;

  addProducto(producto: Producto) : Observable<string> {
    return this.http.post<string>(`${this.url}/producto/add`, producto);
  }
  editProducto(producto: Producto) : Observable<string> {
    return this.http.put<string>(`${this.url}/edit/add`, producto);
  }
  deleteProducto(id: number) : Observable<string> {
    return this.http.delete<string>(`${this.url}/producto/delete/${id}`);
  }

  getProductoById(id: number) : Observable<Producto> {
    return this.http.get<Producto>((`${this.url}/producto/${id}`));
  }

}
