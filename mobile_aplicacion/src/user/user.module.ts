import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersRoutingModule } from './user-routing.module';
import { UsersService } from './services/user/users.service';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UserService } from 'src/app/core/services/user/user.service';



@NgModule({
  declarations: [
    RegisterComponent,
    UpdateUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsersRoutingModule
  ],
  providers:[UsersService, UserService]
})
export class UserModule { }
