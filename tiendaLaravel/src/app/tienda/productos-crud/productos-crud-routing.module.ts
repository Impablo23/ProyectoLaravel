import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductoComponent } from './add-producto/add-producto.component';
import { EditProductoComponent } from './edit-producto/edit-producto.component';
import { DeleteProductoComponent } from './delete-producto/delete-producto.component';
import { LayoutProductoComponent } from './layout-producto/layout-producto.component';

const routes: Routes = [
  {
    // localhost:4200/tienda/producto
    path: '',
    component: LayoutProductoComponent,
    children: [
      { path: 'add', component: AddProductoComponent },
      { path: 'edit/:id', component: EditProductoComponent },
      { path: 'delete/:id', component: DeleteProductoComponent },
      { path: '', redirectTo: 'add', pathMatch: 'full' },
      { path: '**', redirectTo: 'add' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosCrudRoutingModule { }
