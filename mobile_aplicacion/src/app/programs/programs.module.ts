import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListedProgramsComponent } from './listed-programs/listed-programs.component';
import { ProgramDetailComponent } from './program-detail/program-detail.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';
import { ProgramsRoutingModule } from './programs-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CommentService } from './services/comment.service';
import { ProgramsService } from './services/programs.service';
import { ProgramTypesService } from './services/program-types.service';


@NgModule({
  declarations: [
    ListedProgramsComponent,
    ProgramDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ProgramsRoutingModule,
    Ng2SearchPipeModule
  ],
  providers: [
    ProgramsService,
    CommentService,
    ProgramTypesService
  ]
})
export class ProgramsModule { }
