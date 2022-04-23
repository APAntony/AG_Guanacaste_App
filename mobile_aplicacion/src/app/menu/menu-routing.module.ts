import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListedPlacesComponent } from 'src/app/touristic-areas/listed-places/listed-places.component';
import { UpdateUserComponent } from 'src/app/user/update-user/update-user.component';
import { MainMenuComponent } from './main-menu/main-menu.component';

const routes: Routes = [
  { 
    path: '', 
    component: MainMenuComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule {}