import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './shared/material.module';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {path:'demo', loadChildren: () => import('./demo/demo.module').then(m => m.DemoModule)},
  {path:'gestfid', loadChildren: () => import('./gestfid/gestfid.module').then(m => m.GestfidModule)},
  {path:'**', redirectTo: 'gestfid'}
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
