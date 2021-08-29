import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  flightdetails: any;

  constructor(private http: HttpClient) { }

  getDashboard_data() {
    return this.http.get('/assets/pessengerDetails.json');
  }
  // editDashboard_data(data: any) {
  //   return this.http.post('/assets/pessengerDetails.json', data);
  // }
  getFlightDetails() {
    return this.http.get('/assets/FlightDetails.json');
  }

  getFlight(){
    return this.flightdetails;
  }

  passFlightDetails(details){
    this.flightdetails = details;
  }

}