import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlightviewComponent } from './flightview/flightview.component';
import { AllflightdetailsComponent } from './allflightdetails/allflightdetails.component';

@NgModule({
  declarations: [
    AppComponent,
    FlightviewComponent,
    AllflightdetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
