import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CheckInComponent } from './check-in/check-in.component';
import { FlightInComponent } from './flight-in/flight-in.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from "angular-datatables";
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {NgxPaginationModule} from 'ngx-pagination';
import { InFlightComponent } from './in-flight/in-flight.component';



@NgModule({
  declarations: [DashboardComponent, CheckInComponent, FlightInComponent, InFlightComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    AngularMyDatePickerModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class AdminModule { }
