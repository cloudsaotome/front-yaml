import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddPathRoutingModule } from './add-path-routing.module';
import { AddPathComponent } from './add-path.component';


@NgModule({
  declarations: [AddPathComponent],
  imports: [
    CommonModule,
    AddPathRoutingModule
  ]
})
export class AddPathModule { }
