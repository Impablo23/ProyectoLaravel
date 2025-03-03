import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Producto } from 'src/interfaces/producto.interface';
import { Venta } from 'src/interfaces/venta.interface';
import { TiendaServiceService } from 'src/services/tienda/tienda-service.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent {

  constructor(
    private router: Router,
    private tiendaService: TiendaServiceService,
    private toast: MatSnackBar,
  ) { }

  public ventasFinalizado!: Venta[];
  public id_usuario: number = 0;
  public nombre_usuario: string = '';
  public listaProductosFinalizadas: Producto[] = [];

  ngOnInit() {
    this.nombre_usuario = sessionStorage.getItem('nombre_user')!;
    this.id_usuario = parseInt(sessionStorage.getItem('id')!);

    // Obtener las ventas finalizadas
    this.tiendaService.getVentaFinalizada().subscribe(
      (finalizadas) => {
        this.ventasFinalizado = finalizadas;

        // Crear un array de observables para obtener los productos
        const productosObservables = this.ventasFinalizado.flatMap((venta) =>
          venta.lista_productos.map((productoItem) =>
            this.tiendaService.getProductoById(productoItem.id_producto)
          )
        );

        // Ejecutar todas las solicitudes a la vez con forkJoin
        forkJoin(productosObservables).subscribe(
          (productos) => {
            this.listaProductosFinalizadas = productos; // Asignamos todos los productos obtenidos
          },
          (error) => {
            console.error('Error al obtener productos:', error);
          }
        );
      },
      (error) => {
        console.error('Error al obtener ventas finalizadas:', error);
      }
    );
  }

  public volver() {
    this.router.navigate(['/tienda']);
  }

  public getNombreProducto(id: number) {
    // Buscar el producto por ID
    let producto = this.listaProductosFinalizadas.find(producto => producto.id === id);

    return producto ? producto.nombre_producto : ''; // Si el producto existe, devuelve su nombre, sino una cadena vacía
  }
}
