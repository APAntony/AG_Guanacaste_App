import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { ListedPlacesComponent } from "src/app/touristic-areas/listed-places/listed-places.component";
import { PlaceDetailComponent } from "./place-detail/place-detail.component";
import { CommentService } from "./services/comment.service";
import { TouristicAreasService } from "./services/touristic-areas.service";
import { TouristicAreasRoutingModule } from "./touristic-areas-routing.module";
import { SharedModule } from '../shared/shared.module'; 
import { TypesTouristicAreaService } from "./services";


@NgModule({
  declarations: [
    ListedPlacesComponent,
    PlaceDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    IonicModule,
    TouristicAreasRoutingModule,
    Ng2SearchPipeModule
  ],
  providers: [TouristicAreasService, CommentService, TypesTouristicAreaService]
})
export class TouristicAreasModule { }