import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListedPlacesComponent } from 'src/app/touristic-areas/listed-places/listed-places.component';

const routes: Routes = [
  { path: '', component: ListedPlacesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TouristicAreasRoutingModule { }