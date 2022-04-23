import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { ListedPlacesComponent } from "src/app/touristic-areas/listed-places/listed-places.component";
import { PlaceDetailComponent } from "./place-detail/place-detail.component";
import { TouristicAreasService } from "./services/touristic-areas.service";
import { TouristicAreasRoutingModule } from "./touristic-areas-routing.module";


@NgModule({
  declarations: [
    ListedPlacesComponent,
    PlaceDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TouristicAreasRoutingModule,
    Ng2SearchPipeModule
  ],
  providers: [TouristicAreasService]
})
export class TouristicAreasModule { }