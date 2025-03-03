import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { authGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: ProfileComponent , canActivate: [authGuard] }, // /profile route
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
