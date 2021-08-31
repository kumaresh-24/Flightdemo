import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckInComponent } from './check-in/check-in.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FlightInComponent } from './flight-in/flight-in.component';
import { InFlightComponent } from './in-flight/in-flight.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent},
  { path: 'check-in', component: CheckInComponent},
  { path: 'flight-in', component: FlightInComponent},
  { path: 'in-flight',component: InFlightComponent},
  { path : "" , redirectTo:"/dashboard",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
