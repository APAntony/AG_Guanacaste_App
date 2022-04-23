import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { MainMenuComponent } from './menu/main-menu/main-menu.component';
import { AuthGuard } from './core/guard/auth/auth.guard';
import { ListedPlacesComponent } from './touristic-areas/listed-places/listed-places.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main-menu',
    pathMatch: 'full'
  },
  {
    path: 'main-menu',
    component: MainMenuComponent,
    children: [
      {
        path:'places',
        loadChildren: () => import('./touristic-areas/touristic-areas.module').then(m => m.TouristicAreasModule)
      }, {
        path: 'login',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      }, {
        path: 'update-user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
      }, {
        path: 'activities',
        loadChildren: () => import('./activities/activities.module').then(m => m.ActivitiesModule)
      }
    ]
  }

  /*{
    path: 'login',
    component:LoginComponent,
    children: [
      {
        path: 'register',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
      }  
    ]
  },*/
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
