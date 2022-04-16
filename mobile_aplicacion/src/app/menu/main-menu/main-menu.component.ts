import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent implements OnInit {

  constructor(
    private router: Router,
    private actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {}

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
          console.log('Login clickeado');
        }
      }, {
        text: 'Editar usuario',
        icon: 'pencil',
        id: 'edit-button',
        handler: () => {
          this.router.navigate(['/update-user'])
          console.log('Editar clickeado');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancelar clickeado');
        }
      }]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }
}
