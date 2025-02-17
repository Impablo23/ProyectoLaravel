import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    // canActivate: [AuthGuardService]
    // canActivate: [HomeGuardService]
  },
  {
    path: 'tienda',
    loadChildren: () => import('./tienda/tienda.module').then(m => m.TiendaModule),
    // canActivate: [AuthGuardService]
    // canMatch: [canMatchGuard]
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: 'auth' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
