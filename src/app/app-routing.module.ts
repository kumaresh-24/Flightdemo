import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlightviewComponent } from './flightview/flightview.component';

const routes: Routes = [
  { path: 'seats', component: FlightviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
