import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutTiendaComponent } from './layout-tienda/layout-tienda.component';
import { ListTiendaComponent } from './list-tienda/list-tienda.component';
import { ProductosCrudModule } from './productos-crud/productos-crud.module';
import { AddProductoComponent } from './productos-crud/add-producto/add-producto.component';
import { LayoutProductoComponent } from './productos-crud/layout-producto/layout-producto.component';
import { VentasComponent } from './ventas/ventas.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { AdminGuard } from '../guards/tienda.guard';

const routes: Routes = [
  {
    // localhost:4200/tienda/
    path: '',
    component: LayoutTiendaComponent,
    children: [
      { path: 'listado', component: ListTiendaComponent },
      { path: 'compra', component: VentasComponent },
      { path: 'pedidos', component: PedidosComponent, canActivate: [AdminGuard] },
      { path: 'producto', loadChildren: () => import('./productos-crud/productos-crud.module').then(m => m.ProductosCrudModule) },
      { path: '**', redirectTo: 'listado' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TiendaRoutingModule { }
