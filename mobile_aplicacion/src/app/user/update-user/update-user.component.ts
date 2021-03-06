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

  public _user: any;
  public get User(): any {
    return this._user
  }

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

    this.myUser.User.subscribe(usuario => {
      if (usuario != null) {
        this._user = usuario.user;
        this.updateForm.controls.name.setValue(this._user.name);
        this.updateForm.controls.email.setValue(this._user.email);
      }
    })
  }

  ngOnInit() { }

  onSubmit(data) {
    this.usersService.update(this._user.id, data).subscribe(result => {
      if (result.success) {
        this.presentToast('Usuario editado con exito!');
        this.router.navigate(['/dashboard'])
      } else {
        this.presentToast(result.error.message);
      }
    })
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });

    toast.present();
  }
}
