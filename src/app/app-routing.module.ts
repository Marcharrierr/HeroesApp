import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page.component';


const routes: Routes = [
  //Lazyload los hijos vienen del auth.module
  // import () es una promesa, que resuelve .then()
  //Cuando el import se cargue en memoria, devolvera el authModule
  {
    path: 'auth',
  loadChildren:() => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'heroes',
  loadChildren:() => import('./heroes/heroes.module').then(m => m.HeroesModule)
  },
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path: '**',
    redirectTo: 'login'
  },
]


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
