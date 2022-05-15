import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import {
  BackButtonComponent,
  ToolbarComponent
} from './components';
import { ImagePipe } from "./pipes";


@NgModule({
  declarations: [
    ToolbarComponent,
    BackButtonComponent,
    ImagePipe,
  ],
  exports: [
    ToolbarComponent,
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