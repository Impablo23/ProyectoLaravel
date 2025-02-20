import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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

  public ventaUsuarioFinalizado!: Venta[];
  public id_usuario: number = 0;

  ngOnInit() {
    this.id_usuario = parseInt(sessionStorage.getItem('id_usuario')!);
    this.ventaUsuarioFinalizado = this.tiendaService.ventas.filter(venta => venta.id_usuario === this.id_usuario && venta.estado_venta === 'finalizado')!;
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

  public volver() {
    this.router.navigate(['/tienda']);
  }

}
