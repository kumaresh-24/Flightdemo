import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  flightdetails: any;
  passengerDetails: any;

  constructor(private http: HttpClient) { }

  getDashboard_data() {
    return this.http.get<any>('/assets/pessengerDetails.json');
  }

  getFlightDetails() {
    return this.http.get<any>('/assets/FlightDetails.json');
  }

  getFlight(){
    return this.flightdetails;
  }

  passFlightDetails(details){
    this.flightdetails = details;
  }

}
