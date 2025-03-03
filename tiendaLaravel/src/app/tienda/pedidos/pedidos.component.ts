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

  public ventasFinalizado!: Venta[];
  public id_usuario: number = 0;
  public nombre_usuario: string = '';

  ngOnInit() {
    this.nombre_usuario = sessionStorage.getItem('nombre_user')!;
    this.id_usuario = parseInt(sessionStorage.getItem('id')!);
    this.tiendaService.getVentaFinalizada().subscribe(
      finalizadas => {
        this.ventasFinalizado = finalizadas;
      }
    );
  }

  public volver() {
    this.router.navigate(['/tienda']);
  }

}
