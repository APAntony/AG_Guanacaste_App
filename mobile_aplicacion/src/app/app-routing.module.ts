import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { MainMenuComponent } from './menu/main-menu/main-menu.component';
import { AuthGuard } from './core/guard/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainMenuComponent,
    children: [
      {
        path:'listed-places',
        loadChildren: () => import('./touristic-areas/touristic-areas.module').then(m => m.TouristicAreasModule)
      }, {
        path: 'login',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      }
    ]
  },
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
