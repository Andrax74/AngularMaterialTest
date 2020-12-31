import { ButtonsComponent } from './buttons/buttons.component';
import { CommonModule } from '@angular/common';
import { DemoRoutingModule } from './demo-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexboxComponent } from './flexbox/flexbox.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [ButtonsComponent, FlexboxComponent],
  imports: [
    CommonModule,
    DemoRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule
  ]
})
export class DemoModule { }
