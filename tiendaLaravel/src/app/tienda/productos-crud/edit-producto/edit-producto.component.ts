import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Producto } from 'src/interfaces/producto.interface';
import { TiendaServiceService } from 'src/services/tienda/tienda-service.service';

@Component({
  selector: 'app-edit-producto',
  templateUrl: './edit-producto.component.html',
  styleUrls: ['./edit-producto.component.css'],
})
export class EditProductoComponent {
  constructor(
    private router: Router,
    private toast: MatSnackBar,
    private tiendaService: TiendaServiceService,
    private activatedRoute: ActivatedRoute
  ) {}

  public nombre_producto: string = '';
  public precio_unidad!: number;
  public stock: number = 0;

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

        this.nombre_producto = this.productoSeleccionado.nombre_producto;
        this.precio_unidad = this.productoSeleccionado.precio_unidad;
        this.stock = this.productoSeleccionado.stock;
      });
  }

  public editProducto() {
    if (
      this.nombre_producto === '' ||
      this.precio_unidad === undefined ||
      this.stock === 0
    ) {
      this.toast.open('No has rellenado todos los datos', 'Dabuten', {
        duration: 3000,
      });
      return;
    }

    const productoEdit: Producto = {
      id: this.productoSeleccionado.id,
      nombre_producto: this.nombre_producto,
      precio_unidad: this.precio_unidad,
      stock: this.stock,
    };

    this.tiendaService.editProducto(productoEdit).subscribe((respuesta) => {
      this.toast.open('Producto Editado Correctamente', 'Dabuten', {
        duration: 3000,
      });
      this.router.navigate(['./tienda']);
    });
  }

  public volver() {
    this.router.navigate(['./tienda']);
  }
}
