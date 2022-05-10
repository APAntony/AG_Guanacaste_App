import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { AuthRoutingModule } from './auth-routing.module';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module'; 


@NgModule({
  declarations: [
    LoginComponent,
    MainMenuComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    AuthRoutingModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    LoginComponent,
    MainMenuComponent
  ],
  providers: [AuthService]
})
export class AuthModule { }
