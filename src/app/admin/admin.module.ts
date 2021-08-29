import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CheckInComponent } from './check-in/check-in.component';
import { FlightInComponent } from './flight-in/flight-in.component';
import { AdminRoutingModule } from './admin-routing.module';



@NgModule({
  declarations: [DashboardComponent, CheckInComponent, FlightInComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
