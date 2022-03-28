import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { RouterModule } from '@angular/router';
import { MenuRoutingModule } from './menu-routing.module';



@NgModule({
  declarations: [
    MainMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MenuRoutingModule
  ]
})
export class MenuModule { }
