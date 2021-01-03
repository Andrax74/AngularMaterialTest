import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { GestfidAppComponent } from './gestfid-app.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { NgModule } from '@angular/core';
import { SideBarComponent } from './components/side-nav/side-nav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

const routes: Routes = [
  {
    path: '', component: GestfidAppComponent,
    children: [
      {path: '', component: MainContentComponent}
    ]
  },
  {path:'**', redirectTo: ''}

];

@NgModule({
  declarations: [GestfidAppComponent, ToolbarComponent, MainContentComponent, SideBarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class GestfidModule { }
