import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './modules/auth/auth.module';
import { HomeModule } from './modules/home/home.module';
import { ProfileModule } from './modules/profile/profile.module';

const routes: Routes = [
  { path: '', loadChildren: () => HomeModule },
  { path: 'auth', loadChildren: () => AuthModule},
  { path: 'profile', loadChildren: () => ProfileModule},
  { path: '**', redirectTo: '/auth/login' } // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
