import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Venta } from 'src/interfaces/venta.interface';
import { TiendaServiceService } from 'src/services/tienda/tienda-service.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent {

  constructor(
    private router: Router,
    private tiendaService: TiendaServiceService,
    private toast: MatSnackBar,
  ) { }

  public ventaUsuarioCurso!: Venta;
  public id_usuario: number = 0;

  ngOnInit() {
    this.id_usuario = parseInt(sessionStorage.getItem('id_usuario')!);
    this.ventaUsuarioCurso = this.tiendaService.ventas.find(venta => venta.id_usuario === this.id_usuario && venta.estado_venta === 'curso')!;
    console.log(this.ventaUsuarioCurso);
  }

  public getNombreProducto(id: number): string {
    // let nombre_producto = '';
    // this.tiendaService.getProductoById(id).subscribe(
    //   producto => {
    //     nombre_producto = producto.nombre_producto;
    //   }
    // );
    // return nombre_producto;

    let producto = this.tiendaService.listadoProductos.find(producto => producto.id === id);

    return producto!.nombre_producto;
  }

  public deleteProductoVenta(id: number) {

    let indexProducto = this.ventaUsuarioCurso.lista_productos.findIndex(producto => producto.id_producto === id);
    if (indexProducto !== -1) {
      this.ventaUsuarioCurso.lista_productos.splice(indexProducto, 1);

      if (this.ventaUsuarioCurso.lista_productos.length !== 0) {
        this.tiendaService.editVenta(this.ventaUsuarioCurso).subscribe(
          respuesta => {
            this.toast.open('Producto eliminado de la venta', 'Dabuten', {
              duration: 3000,
            });
          }
        );
      } else {
        this.tiendaService.deleteVenta(this.ventaUsuarioCurso.id).subscribe(
          respuesta => {
            this.toast.open('Producto eliminado de la venta', 'Dabuten', {
              duration: 3000,
            });
            this.router.navigate(['/tienda']);
          }
        );
      }

    } else {
      this.toast.open('Este producto no se encuentra en la venta', 'Dabuten', {
        duration: 3000,
      });
    }
  }

  public  getTotalVenta() : number {
    let total = 0;
    for (let i = 0; i < this.ventaUsuarioCurso.lista_productos.length; i++) {
      // await this.tiendaService.getProductoById(this.ventaUsuarioCurso.lista_productos[i].id_producto).subscribe(
      //   producto => {
      //     total += producto.precio_unidad * this.ventaUsuarioCurso.lista_productos[i].cantidad;
      //   }
      // );
      let producto = this.tiendaService.listadoProductos.find(producto => producto.id === this.ventaUsuarioCurso.lista_productos[i].id_producto);
      total += producto!.precio_unidad * this.ventaUsuarioCurso.lista_productos[i].cantidad;
    }
    return total;
  }

  public finalizarVenta() {
    this.ventaUsuarioCurso.estado_venta = 'finalizado';
    this.ventaUsuarioCurso.total = this.getTotalVenta();
    this.tiendaService.editVenta(this.ventaUsuarioCurso).subscribe(
      respuesta => {
        this.toast.open('Compra finalizada con Éxito', 'Dabuten', {
          duration: 3000,
        });
        this.router.navigate(['/tienda']);
      }
    );
  }

  public volver() {
    this.router.navigate(['/tienda']);
  }

}
