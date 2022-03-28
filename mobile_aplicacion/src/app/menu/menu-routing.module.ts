import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListedPlacesComponent } from 'src/touristic-areas/listed-places/listed-places.component';
import { MainMenuComponent } from './main-menu/main-menu.component';

const routes: Routes = [
  { path: '', component: MainMenuComponent },
  { path: 'listed-places', component:ListedPlacesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule {}