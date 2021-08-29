import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckInComponent } from './check-in/check-in.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FlightInComponent } from './flight-in/flight-in.component';

const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'check-in', component: CheckInComponent},
  { path: 'flight-in', component: FlightInComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
