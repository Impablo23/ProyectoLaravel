import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ListaProductos } from 'src/interfaces/listaProducto.interface';
import { Venta } from 'src/interfaces/venta.interface';
import { TiendaServiceService } from 'src/services/tienda/tienda-service.service';
import { firstValueFrom } from 'rxjs';

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
  public listaProductosUsuarioCurso!: ListaProductos[];
  public id_usuario: number = 0;

  async ngOnInit() {
    this.id_usuario = parseInt(sessionStorage.getItem('id')!);
    await this.tiendaService.getVentaCurso(this.id_usuario).subscribe(venta => {
      this.ventaUsuarioCurso = venta[0];
      this.listaProductosUsuarioCurso = venta[0].lista_productos;
      console.log(this.listaProductosUsuarioCurso[0].id_producto);


    })
  }

  public async getNombreProducto(id: number): Promise<string> {
    let nombre = '';
    try {
      await this.tiendaService.getProductoById(id).subscribe(producto => {
        nombre = producto.nombre_producto;
      })
    } catch (error) {
      console.error('Error al obtener el producto:', error);
      return '';
    }
    return nombre;
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

  // public async getTotalVenta(): Promise<number> {
  //   let total = 0;
  //   for (let i = 0; i < this.listaProductosUsuarioCurso.length; i++) {
  //     // const respuestaProducto = await this.tiendaService.getProductoById(this.listaProductosUsuarioCurso[i].id_producto).toPromise();
  //     // total += respuestaProducto!.precio_unidad * this.listaProductosUsuarioCurso[i].cantidad;
  //     // let producto = this.tiendaService.listadoProductos.find(producto => producto.id === this.ventaUsuarioCurso.lista_productos[i].id_producto);
  //     // total += producto!.precio_unidad * this.ventaUsuarioCurso.lista_productos[i].cantidad;
  //   }
  //   return total;
  // }

  public async finalizarVenta() {
    this.ventaUsuarioCurso.estado_venta = 'finalizado';
    // this.ventaUsuarioCurso.total = await this.getTotalVenta();
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
