import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserService as MyUser } from 'src/app/core/services/user/user.service';
import { UsersService } from '../services/user/users.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
})
export class UpdateUserComponent implements OnInit {

  public updateForm: FormGroup;
  public user: any;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private myUser: MyUser,
    private usersService: UsersService,
    private toastController: ToastController
  ) {
    this.updateForm = formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(8)]]
    })

    this.myUser.User.subscribe(usuario =>{
      this.user = usuario;
    })

    //this.user = {"name":"Antony", "email":"tony@gmail.com"}
  }

  ngOnInit() {}

  onSubmit(data) {
    data = this.checkData(data)
    console.log(data)
    if (data.password !== "") {
      this.usersService.update(this.user.id, data).subscribe(result => {
        if (result.success) {
          this.presentToastWithOptions('Usuario editado con exito!');
          this.router.navigate(['/main-menu'])
        } else {
          this.presentToastWithOptions(result.error.message);
        }
      })
    } else {
      this.presentToastWithOptions('Tiene que ingresar su contraseña o una nueva');
    }
  }

  checkData(data) {
    if (data.name === "") {
      data.name = this.user.name;
    } if (data.email === "") {
      data.email = this.user.email;
    }

    return data;
  }

  async presentToastWithOptions(msg: string) {
    const toast = await this.toastController.create({
      header: 'Aviso',
      message: msg,
      icon: 'information-circle',
      position: 'bottom',
    });
    await toast.present();
  }
}
