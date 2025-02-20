import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Producto } from 'src/interfaces/producto.interface';
import { Venta } from 'src/interfaces/venta.interface';
import { TiendaServiceService } from 'src/services/tienda/tienda-service.service';

@Component({
  selector: 'app-list-tienda',
  templateUrl: './list-tienda.component.html',
  styleUrls: ['./list-tienda.component.css']
})
export class ListTiendaComponent {

  constructor(
    private router: Router,
    private toast: MatSnackBar,
    private tiendaService: TiendaServiceService
  ) { }

  public rol_id: string = '';
  public id_usuario: number = 0;
  public id: number = 0;

  public stockCompra: number = 0;

  public listadoProductos: Producto[] = [];

  ngOnInit() {
    sessionStorage.setItem('rol_id', '2');
    sessionStorage.setItem('id_usuario', '15');
    this.rol_id = sessionStorage.getItem('rol_id')!;
    this.id_usuario = parseInt(sessionStorage.getItem('id_usuario')!);
    this.listadoProductos = this.tiendaService.listadoProductos;
  }

  public addPage() {
    this.router.navigate(['./tienda/producto']);
  }
  public editPage(id: number) {
    this.router.navigate([`./tienda/producto/edit/${id}`]);
  }
  public deletePage(id: number) {
    this.router.navigate([`./tienda/producto/delete/${id}`]);
  }

  public comprasPage() {
    this.router.navigate(['./tienda/compra']);
  }


  public addCompra(producto: Producto) {

    if (producto.stock < this.stockCompra) {
      this.toast.open(
        'Insercción Denegada porque ha excedido la cantidad de stock',
        'Dabuten',
        {
          duration: 3000,
        }
      );
      return;
    }

    if (this.stockCompra === 0) {
      this.toast.open(
        'Insercción Denegada porque no ha seleccionado una cantidad',
        'Dabuten',
        {
          duration: 3000,
        }
      );
      return;
    }

    this.tiendaService.getVentaCurso(this.id_usuario).subscribe(
      venta => {
        let ventaCurso = venta;

        if (!ventaCurso) {

          const nuevaVenta: Venta = {
            id: 0,
            id_usuario: (this.id_usuario),
            estado_venta: 'curso',
            lista_productos: [
              {
                id_producto: producto.id,
                cantidad: this.stockCompra
              }
            ],
            total: 0
          };

          console.log(nuevaVenta);


          this.tiendaService.addVenta(nuevaVenta).subscribe(
            respuesta => {

              const productoEditado: Producto = {
                id: producto.id,
                nombre_producto: producto.nombre_producto,
                precio_unidad: producto.precio_unidad,
                stock: producto.stock - this.stockCompra
              }

              this.tiendaService.editProducto(productoEditado).subscribe(
                respuesta => {
                  this.toast.open(
                    'Producto Añadido a tu cesta de la compra',
                    'Dabuten',
                    {
                      duration: 3000,
                    }
                  );
                  this.router.navigate(['./tienda']);
                }
              );

            }
          );

        } else {
          ventaCurso.lista_productos.push(
            {
              id_producto: producto.id,
              cantidad: this.stockCompra
            }
          );

          // ventaCurso.total = ventaCurso.total + (producto.precio_unidad * this.stockCompra);

          this.tiendaService.editVenta(ventaCurso).subscribe(
            respuesta => {

              const productoEditado: Producto = {
                id: producto.id,
                nombre_producto: producto.nombre_producto,
                precio_unidad: producto.precio_unidad,
                stock: producto.stock - this.stockCompra
              }

              this.tiendaService.editProducto(productoEditado).subscribe(
                respuesta => {
                  this.toast.open(
                    'Producto Añadido a tu cesta de la compra',
                    'Dabuten',
                    {
                      duration: 3000,
                    }
                  );
                  this.router.navigate(['./tienda']);
                }
              );
            }
          );

        }


      }
    );



  }

}
