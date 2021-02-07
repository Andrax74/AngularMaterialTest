import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { CacheInterceptorService } from './services/cache-interceptor.service';
import { ClientiService } from './services/clienti.service';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GestfidAppComponent } from './gestfid-app.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { MaterialModule } from '../shared/material.module';
import { NewClienteDialogComponent } from './components/new-cliente-dialog/new-cliente-dialog.component';
import { NgModule } from '@angular/core';
import { ResponseInterceptorService } from './services/response-interceptor.service';
import { SalesComponent } from './components/sales/sales.component';
import { SideBarComponent } from './components/side-nav/side-nav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

const routes: Routes = [
  {
    path: '', component: GestfidAppComponent,
    children: [
      {path: ':codFid', component: MainContentComponent},
      {path: '', component: MainContentComponent}
    ]
  },
  {path:'**', redirectTo: ''}

];

@NgModule({
  declarations: [GestfidAppComponent, ToolbarComponent, MainContentComponent, SideBarComponent, SalesComponent, NewClienteDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    ClientiService,
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptorService, multi: true },
  ]
})
export class GestfidModule { }
