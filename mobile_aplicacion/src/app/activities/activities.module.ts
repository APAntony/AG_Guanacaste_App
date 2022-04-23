import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';
import { ListedActivitiesComponent } from './listed-activities/listed-activities.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivitiesRoutingModule } from './activities-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';



@NgModule({
  declarations: [
    ListedActivitiesComponent,
    ActivityDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActivitiesRoutingModule,
    Ng2SearchPipeModule
  ]
})
export class ActivitiesModule { }
