import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UsersService } from '../services/user/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private usersService: UsersService,
    private toastController: ToastController
  ) {
    this.registerForm = formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(8)]]
    })
  }

  ngOnInit() {}

  onSubmit(data) {
    data.id_rol = 1;
    //console.log(data);

    this.usersService.create(data).subscribe(result => {
      if (result.success) {
        this.presentToastWithOptions('Usuario creado con exito!');
        this.router.navigate(['/']);
      } else {
        console.log(result.error.message);
        this.presentToastWithOptions(result.error.message);
      }
    })
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
