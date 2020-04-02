import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'cart', component: CartIconComponent },
  { path: 'home', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
