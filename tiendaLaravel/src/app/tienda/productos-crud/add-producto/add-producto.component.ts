import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Producto } from 'src/interfaces/producto.interface';
import { TiendaServiceService } from 'src/services/tienda/tienda-service.service';

@Component({
  selector: 'app-add-producto',
  templateUrl: './add-producto.component.html',
  styleUrls: ['./add-producto.component.css']
})
export class AddProductoComponent {

  constructor(
    private router : Router,
    private toast: MatSnackBar,
    private tiendaService: TiendaServiceService
  ){}

  public nombre_producto : string = '';
  public precio_unidad! : number;
  public stock: number = 0;


  public addProducto() {
    if (this.nombre_producto === '' || this.precio_unidad === undefined || this.stock === 0) {
      this.toast.open(
        'No has rellenado todos los datos',
        'Dabuten',
        {
          duration: 3000,
        }
      );
      return;
    }

    const productoNew : Producto = {
      id: 0,
      nombre_producto: this.nombre_producto,
      precio_unidad: this.precio_unidad,
      stock: this.stock
    }

    this.tiendaService.addProducto(productoNew).subscribe(respuesta => {
      this.toast.open(
        'Producto Añadido Correctamente',
        'Dabuten',
        {
          duration: 3000,
        }
      );
      this.router.navigate(['./tienda']);
    })
  }

  public volver() {
    this.router.navigate(['./tienda']);
  }

}
