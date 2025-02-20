import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Producto } from 'src/interfaces/producto.interface';
import { TiendaServiceService } from 'src/services/tienda/tienda-service.service';

@Component({
  selector: 'app-delete-producto',
  templateUrl: './delete-producto.component.html',
  styleUrls: ['./delete-producto.component.css'],
})
export class DeleteProductoComponent {
  constructor(
    private router: Router,
    private toast: MatSnackBar,
    private tiendaService: TiendaServiceService,
    private activatedRoute: ActivatedRoute
  ) {}

  public productoSeleccionado!: Producto;

  ngOnInit() {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.tiendaService.getProductoById(id)))
      .subscribe((producto) => {
        if (!producto) {
          this.router.navigate(['./tienda']);
          return;
        }
        this.productoSeleccionado = producto;
      });
  }


  public deleteProducto() {
    this.tiendaService.deleteProducto(this.productoSeleccionado.id).subscribe(respuesta => {
      this.toast.open('Producto Eliminado Correctamente', 'Dabuten', {
        duration: 3000,
      });
      this.router.navigate(['./tienda']);
    });
  }



  public volver() {
    this.router.navigate(['./tienda']);
  }
}
