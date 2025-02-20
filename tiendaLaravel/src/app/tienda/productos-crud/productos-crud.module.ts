import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosCrudRoutingModule } from './productos-crud-routing.module';
import { AddProductoComponent } from './add-producto/add-producto.component';
import { EditProductoComponent } from './edit-producto/edit-producto.component';
import { DeleteProductoComponent } from './delete-producto/delete-producto.component';
import { LayoutProductoComponent } from './layout-producto/layout-producto.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddProductoComponent,
    EditProductoComponent,
    DeleteProductoComponent,
    LayoutProductoComponent
  ],
  imports: [
    CommonModule,
    ProductosCrudRoutingModule,
    RouterModule,
    FormsModule
  ]
})
export class ProductosCrudModule { }
