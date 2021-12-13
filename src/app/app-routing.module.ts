import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import ('./modulos/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import ('./modulos/inicio/inicio.module').then(m => m.InicioModule)
  },
  {
    path: 'add-path',
    loadChildren: () => import ('./modulos/add-path/add-path.module').then(m => m.AddPathModule)
  },
  {
    path: '404',
    loadChildren: () => import ('./modulos/not-found/not-found.module').then(m => m.NotFoundModule)
  },
  { 
    path: '**', 
    redirectTo: '404' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
