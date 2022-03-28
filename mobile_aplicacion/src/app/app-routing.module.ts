import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from '../user/register/register.component';
import { MainMenuComponent } from './menu/main-menu/main-menu.component';
import { AuthGuard } from './core/guard/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component:LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'main-menu',
    component: MainMenuComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path:'listed-places',
        loadChildren: () => import('../touristic-areas/touristic-areas.module').then(m => m.TouristicAreasModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
