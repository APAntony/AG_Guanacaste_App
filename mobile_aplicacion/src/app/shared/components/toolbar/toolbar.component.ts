import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@core/services/user/user.service';
import { ActionSheetController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {

  constructor(
    private router: Router,
    private actionSheetController: ActionSheetController,
    private toastController: ToastController,
    private userService: UserService
  ) {

  }

  ngOnInit() {
    //this.dato = history.state;
  }


  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones de usuario',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Login',
          icon: 'person-circle',
          id: 'login-button',
          handler: () => {
            if (this.userService.isLogin()) {
              this.presentToast('Ya hay un usuario iniciado');
            } else {
              this.router.navigate(['/login']);
            }

            //console.log('Login clickeado');
          }
        }, {
          text: 'Cerrar sesión',
          icon: 'log-out',
          id: 'log-out-button',
          handler: () => {
            if (this.userService.isLogin() === false) {
              this.presentToast('No hay un usuario iniciado');
            } else {
              this.userService.logout();
            }
          }
        }, {
          text: 'Editar usuario',
          icon: 'pencil',
          id: 'edit-button',
          handler: () => {
            if (this.userService.isLogin() === false) {
              this.presentToast('No hay un usuario iniciado');
            } else {
              this.router.navigate(['/update-user']);
            }
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            //console.log("Dato: " + this.dato.name)
            //console.log('Cancelar clickeado');
          }
        }]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });

    toast.present();
  }

}
