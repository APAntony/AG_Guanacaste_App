import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListedPlacesComponent } from 'src/app/touristic-areas/listed-places/listed-places.component';
import { PlaceDetailComponent } from './place-detail/place-detail.component';

const routes: Routes = [
  { path: 'places', component: ListedPlacesComponent },
  { path: 'place-detail', component: PlaceDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TouristicAreasRoutingModule { }