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

  /*private form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  public get Form(): FormGroup {
    return this.form;
  }*/

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

  ngOnInit(): void {}

  onSubmit(data) {
    //console.log(data);
    this.authService.login(data).subscribe(result => {
      //console.log(result.success);
      if (result.success) {
        this.presentToastWithOptions('Credenciales validas');
        this.userService.setUser(result.data);
        this.router.navigate(['/main-menu']);
      } else {
        //console.log(result.error.message);
        this.presentToastWithOptions(result.error.message);
        
        //TEMPORAL
        this.router.navigate(['/']);
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
