import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersRoutingModule } from './user-routing.module';
import { UsersService } from './services/user/users.service';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UserService } from 'src/app/core/services/user/user.service';
import { SharedModule } from '../shared/shared.module';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    RegisterComponent,
    UpdateUserComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    UsersRoutingModule
  ],
  providers:[UsersService, UserService]
})
export class UserModule { }
