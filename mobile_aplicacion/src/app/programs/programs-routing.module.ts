import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListedProgramsComponent } from './listed-programs/listed-programs.component';
import { ProgramDetailComponent } from './program-detail/program-detail.component';

const routes: Routes = [
  { path: 'programs', component: ListedProgramsComponent },
  { path: 'program-detail/:id', component: ProgramDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramsRoutingModule { }