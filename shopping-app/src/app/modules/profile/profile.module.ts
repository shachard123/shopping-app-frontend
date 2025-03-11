import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { ShopDialogComponent } from './components/shop-dialog/shop-dialog.component';
import { MatTabsModule } from '@angular/material/tabs'; // ✅ Tabs
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog'; // ✅ Dialog
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShopDetailsComponent } from './pages/shop-details/shop-details.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ShopsComponent } from './pages/shops/shops.component';
import { ProductDialogComponent } from './components/product-dialog/product-dialog.component';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [
    ProfileComponent,
    ShopDialogComponent,
    ShopDetailsComponent,
    OrdersComponent,
    ShopsComponent,
    ProductDialogComponent,

  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatTabsModule, // ✅ Tabs
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule, // ✅ Dialog
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class ProfileModule {}
