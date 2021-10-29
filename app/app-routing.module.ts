import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LocationComponent } from './location/location.component';
import { BookingdetailsComponent } from './bookingdetails/bookingdetails.component';
import {LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'location', 
    component: LocationComponent, 
    canActivate: [AuthGuard] },
  { path: 'bookingdetails', 
    component: BookingdetailsComponent,
    canActivate: [AuthGuard] },
    { path: 'logout', component:LogoutComponent},
    { path: 'admin', component:AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
