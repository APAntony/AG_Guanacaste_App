import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ListedPlacesComponent } from "src/touristic-areas/listed-places/listed-places.component";
import { TouristicAreasRoutingModule } from "./touristic-areas-routing.module";


@NgModule({
  declarations: [
    ListedPlacesComponent
  ],
  imports: [
    CommonModule,
    TouristicAreasRoutingModule
  ],
  providers: []
})
export class TouristicAreasModule { }