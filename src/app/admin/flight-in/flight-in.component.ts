import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-flight-in',
  templateUrl: './flight-in.component.html',
  styleUrls: ['./flight-in.component.scss']
})
export class FlightInComponent implements OnInit {

  pessengerDetails: any;
  flightSeatsSequence = [
    ['1A', '1B', '1C', 'X', '1E', '1F'],
    ['2A', '2B', '2C', '2D', '2E', '2F'],
    ['3A', '3B', '3C', '3D', '3E', '3F'],
    ['4A', '4B', '4C', '4D', '4E', '4F'],
    ['5A', '5B', '5C', '5D', '5E', '5F'],
    ['6A', '6B', '6C', '6D', '6E', '6F'],
    ['7A', '7B', '7C', '7D', '7E', '7F'],
    ['8A', '8B', '8C', '8D', '8E', '8F'],
    // ['9A', '9B', '9C', '9D', '9E', '9F'],
    // ['10A', '10B', '10C', '10D', '10E', '10F'],
    // ['11A', '11B', '11C', '11D', '11E', '11F'],
    // ['12A', '12B', '12C', '12D', '12E', '12F'],
    // ['13A', '13B', '13C', '13D', '13E', '13F'],
    // ['14A', '14B', '14C', '14D', '14E', '14F'],
    // ['15A', '15B', '15C', '15D', '15E', '15F'],
  ]
  flightdetails: any;
  passenger_data: any[] = [];

  constructor(private service: AppService, private router: Router) { }

  ngOnInit(): void {

    this.flightdetails =  this.service.getFlight()
    console.log(this.flightdetails)
    if(this.flightdetails == undefined || this.flightdetails == null){
      this.router.navigate(['/'])
    }
    this.getTable_data()
  }

  getTable_data(){
    this.service.getDashboard_data().subscribe(data =>{
      console.log(data);
      this.passenger_data = data;
      console.log(this.passenger_data)
    })
  }



  checkPassengerType(seat){
    console.log(seat, this.passenger_data)
    var detailsbasedonseat = this.passenger_data.filter(x=>x.seatNumber == seat)
    return detailsbasedonseat[0]?.type;
  }

}
