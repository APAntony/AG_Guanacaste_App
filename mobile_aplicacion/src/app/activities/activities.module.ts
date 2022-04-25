import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';
import { ListedActivitiesComponent } from './listed-activities/listed-activities.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivitiesRoutingModule } from './activities-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ActivitiesService } from './services/activities.service';
import { CommentService } from './services/comment.service';
import { AccessibilitiesService } from './services/accessibilities.service';
import { ActivityTypesService } from './services/activity-types.service';
import { DifficultiesService } from './services/difficulties.service';



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
  ],
  providers: [
    ActivitiesService,
    CommentService,
    AccessibilitiesService,
    ActivityTypesService,
    DifficultiesService
  ]
})
export class ActivitiesModule { }
