import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user/user.service';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public userForm: FormGroup;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    public formBuilder: FormBuilder,
    private router: Router,
    private toastController: ToastController
  ) {
    this.userForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  ngOnInit(): void {
    this.userService.logout();
  }

  onSubmit(data) {
    this.authService.login(data).subscribe(result => {
      if (result.success) {
        this.presentToast('Credenciales validas');
        this.userService.setUser(result.data);
        this.router.navigate(['/dashboard']);
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
