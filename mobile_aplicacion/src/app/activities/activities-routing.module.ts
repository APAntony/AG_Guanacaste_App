import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';
import { ListedActivitiesComponent } from './listed-activities/listed-activities.component';

const routes: Routes = [
  { path: 'activities', component: ListedActivitiesComponent },
  { path: 'activity-detail/:id', component: ActivityDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitiesRoutingModule { }