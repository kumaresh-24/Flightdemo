import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flightview',
  templateUrl: './flightview.component.html',
  styleUrls: ['./flightview.component.scss']
})
export class FlightviewComponent implements OnInit {
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
    ['9A', '9B', '9C', '9D', '9E', '9F'],
    ['10A', '10B', '10C', '10D', '10E', '10F'],
    ['11A', '11B', '11C', '11D', '11E', '11F'],
    ['12A', '12B', '12C', '12D', '12E', '12F'],
    ['13A', '13B', '13C', '13D', '13E', '13F'],
    ['14A', '14B', '14C', '14D', '14E', '14F'],
    ['15A', '15B', '15C', '15D', '15E', '15F'],
  ]

  constructor() { }

  ngOnInit(): void {
    this.pessengerDetails = {
      'flightname' : 'Air Asia',
      'pessengername' : 'Ramesh Babu',
      'status' : 'Checked-In',
      'seatNumber' : '10A'
    }
  }

  getType(i){
    console.log(i[i.length-1])
    return i[i.length-1];
  }

  changeStatus(i){

  }

}
