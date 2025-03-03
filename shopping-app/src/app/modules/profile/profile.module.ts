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


@NgModule({
  declarations: [ProfileComponent, ShopDialogComponent],
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
    ReactiveFormsModule
  ]
})
export class ProfileModule { }
