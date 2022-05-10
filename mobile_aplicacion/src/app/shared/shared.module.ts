import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import {
  BackButtonComponent,
  HomeButtonComponent,
  ToolbarComponent
} from './components';
import { ImagePipe } from "./pipes";


@NgModule({
  declarations: [
    ToolbarComponent,
    HomeButtonComponent,
    BackButtonComponent,
    ImagePipe,
  ],
  exports: [
    ToolbarComponent,
    HomeButtonComponent,
    BackButtonComponent,
    ImagePipe,
  ],
  imports: [
    IonicModule,
    RouterModule,
  ],
  providers: [

  ]
})
export class SharedModule { }