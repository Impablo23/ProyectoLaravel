import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ListaProductos } from 'src/interfaces/listaProducto.interface';
import { Venta } from 'src/interfaces/venta.interface';
import { TiendaServiceService } from 'src/services/tienda/tienda-service.service';
import { firstValueFrom } from 'rxjs';
import { Producto } from 'src/interfaces/producto.interface';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css'],
})
export class VentasComponent {
  constructor(
    private router: Router,
    private tiendaService: TiendaServiceService,
    private toast: MatSnackBar
  ) { }

  public ventaUsuarioCurso!: Venta;
  public listaProductosUsuarioCurso!: ListaProductos[];
  public listaDatosProductos: Producto[] = [];
  public id_usuario: number = 0;
  public nombre_usuario: string = '';

  async ngOnInit() {
    this.nombre_usuario = sessionStorage.getItem('nombre_user')!;
    this.id_usuario = parseInt(sessionStorage.getItem('id')!);
    await this.tiendaService
      .getVentaCurso(this.id_usuario)
      .subscribe(async (venta) => {
        this.ventaUsuarioCurso = venta[0];
        this.listaProductosUsuarioCurso = venta[0].lista_productos;

        for (let i = 0; i < this.listaProductosUsuarioCurso.length; i++) {
          await this.tiendaService
            .getProductoById(this.listaProductosUsuarioCurso[i].id_producto)
            .subscribe((producto) => {
              this.listaDatosProductos.push(producto);
            });
        }
      });

  }


  public deleteProductoVenta(id: number) {
    let indexProducto = this.ventaUsuarioCurso.lista_productos.findIndex(
      (producto) => producto.id_producto === id
    );
    let indexDetalleProducto = this.listaDatosProductos.findIndex(
      (producto) => producto.id === id
    );

    if (indexProducto !== -1) {
      this.ventaUsuarioCurso.lista_productos.splice(indexProducto, 1);
      this.listaDatosProductos.slice(indexDetalleProducto, 1);

      if (this.ventaUsuarioCurso.lista_productos.length !== 0) {
        this.tiendaService
          .editVenta(this.ventaUsuarioCurso)
          .subscribe((respuesta) => {
            this.toast.open('Producto eliminado de la venta', 'Dabuten', {
              duration: 3000,
            });
          });
      } else {
        this.tiendaService
          .deleteVenta(this.ventaUsuarioCurso.id)
          .subscribe((respuesta) => {
            this.toast.open('Producto eliminado de la venta', 'Dabuten', {
              duration: 3000,
            });
            this.router.navigate(['/tienda']);
          });
      }
    } else {
      this.toast.open('Este producto no se encuentra en la venta', 'Dabuten', {
        duration: 3000,
      });
    }
  }

  public async finalizarVenta() {
    this.ventaUsuarioCurso.estado_venta = 'finalizado';
    this.tiendaService
      .editVenta(this.ventaUsuarioCurso)
      .subscribe((respuesta) => {
        this.toast.open('Compra finalizada con Éxito', 'Dabuten', {
          duration: 3000,
        });
        this.router.navigate(['/tienda']);
      });
  }

  public volver() {
    this.router.navigate(['/tienda']);
  }

  public getNombreProducto(id: number) {
    let producto = this.listaDatosProductos.find(producto => producto.id === id);
    return producto!.nombre_producto;
  }
}
