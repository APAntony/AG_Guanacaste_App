import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@core/services/user/user.service';
import { ActionSheetController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
})
export class BackButtonComponent implements OnInit {

  @Input('Url')
  private _url:string;
  public get Url():string{
    return this._url;
  }
  public set Url(url:string){
    this._url = url
  }

  constructor( ) {

  }

  ngOnInit() {
    //this.dato = history.state;
  }
}
