import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TiendaRoutingModule } from './tienda-routing.module';
import { LayoutTiendaComponent } from './layout-tienda/layout-tienda.component';
import { ListTiendaComponent } from './list-tienda/list-tienda.component';
import { LayoutProductoComponent } from './productos-crud/layout-producto/layout-producto.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [LayoutTiendaComponent, ListTiendaComponent],
  imports: [CommonModule, TiendaRoutingModule, FormsModule, MaterialModule],
})
export class TiendaModule {}
