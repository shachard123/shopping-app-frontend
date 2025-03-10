import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { ShopDetailsComponent } from './pages/shop-details/shop-details.component';
import { authGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: ProfileComponent , canActivate: [authGuard] }, // /profile route
  { path: 'shop/:id', component: ShopDetailsComponent, canActivate: [authGuard] } // /profile/shop/:id route
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
