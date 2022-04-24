import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent implements OnInit {

  public dato: any;

  constructor(
    private router: Router,
    private actionSheetController: ActionSheetController,
    private toastController: ToastController,
    private userService: UserService
  ) { 
    //this.dato = this.router.getCurrentNavigation().extras.state
  }

  ngOnInit() {
    //this.dato = history.state;
  }

  goPlaces () {
    this.router.navigate(['/places'])
  }

  goActivities() {
    this.router.navigate(['/activities'])
  }

  onClick() {
    this.presentActionSheet();
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
          this.router.navigate(['/login'])
          //console.log('Login clickeado');
        }
      }, {
        text: 'Editar usuario',
        icon: 'pencil',
        id: 'edit-button',
        handler: () => {
          if (this.userService.isLogin() == false) {
            this.presentToast("No hay un usuario iniciado");
          } else {
            this.router.navigate(['/update-user'])
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
