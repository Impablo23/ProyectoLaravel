import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TiendaRoutingModule } from './tienda-routing.module';
import { LayoutTiendaComponent } from './layout-tienda/layout-tienda.component';
import { ListTiendaComponent } from './list-tienda/list-tienda.component';
import { LayoutProductoComponent } from './productos-crud/layout-producto/layout-producto.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { VentasComponent } from './ventas/ventas.component';
import { PedidosComponent } from './pedidos/pedidos.component';

@NgModule({
  declarations: [LayoutTiendaComponent, ListTiendaComponent, VentasComponent, PedidosComponent],
  imports: [CommonModule, TiendaRoutingModule, FormsModule, MaterialModule],
})
export class TiendaModule {}
