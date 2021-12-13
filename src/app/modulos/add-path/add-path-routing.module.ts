import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPathComponent } from './add-path.component';


const routes: Routes = [
  {
    path: '',
    component: AddPathComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddPathRoutingModule { }
