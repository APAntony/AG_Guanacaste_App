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
    const buttons = [];

    if (!this.userService.isLogin()) {
      buttons.push({
        text: 'Login',
        icon: 'person-circle',
        id: 'login-button',
        handler: () => this.router.navigate(['/login'])
      });
    }

    if (this.userService.isLogin()) {
      buttons.push({
        text: 'Cerrar sesión',
        icon: 'log-out',
        id: 'log-out-button',
        handler: () => this.userService.logout()
      }, {
        text: 'Editar usuario',
        icon: 'pencil',
        id: 'edit-button',
        handler: () => this.router.navigate(['/update-user'])
      });
    }

    buttons.push({
      text: 'Cancel',
      icon: 'close',
      role: 'cancel',
      id: 'close',
      handler: () => null
    })

    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones de usuario',
      cssClass: 'my-custom-class',
      buttons: buttons
    });
    await actionSheet.present();
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });

    toast.present();
  }

}
