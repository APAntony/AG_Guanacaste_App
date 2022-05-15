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

  private _menu: any[];
  public get Menu(): any[] {
    return this._menu;
  }


  constructor(
  ) {
    //this.dato = this.router.getCurrentNavigation().extras.state
    this._menu = [
      { id: 'places', title: 'Lugares Turisticos', link: '/places', icon: 'map-outline', image: '../../../assets/idilico.png' },
      { id: 'activities', title: 'Actividades', link: '/activities', icon: 'walk-outline', image: '../../../assets/canopy.jpg' },
      { id: 'programs', title: 'Programas', link: '/programs', icon: 'reader-outline', image: '../../../assets/program.png' }
    ]
  }


  ngOnInit() {
    //this.dato = history.state;
  }



}
