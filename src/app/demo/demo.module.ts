import { ButtonsComponent } from './buttons/buttons.component';
import { CommonModule } from '@angular/common';
import { DemoRoutingModule } from './demo-routing.module';
import { MaterialModule } from '../shared/material.module';
import { NgModule } from '@angular/core';
import { FlexboxComponent } from './flexbox/flexbox.component';

@NgModule({
  declarations: [ButtonsComponent, FlexboxComponent],
  imports: [
    CommonModule,
    DemoRoutingModule,
    MaterialModule,
  ]
})
export class DemoModule { }
