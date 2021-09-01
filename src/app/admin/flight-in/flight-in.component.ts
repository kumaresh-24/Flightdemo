import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-flight-in',
  templateUrl: './flight-in.component.html',
  styleUrls: ['./flight-in.component.scss']
})
export class FlightInComponent implements OnInit {

  pessengerDetails: any;
  @ViewChild('bookseat') bookedseat:ElementRef;
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
  passenger_data: any=[];
  selectedseat: any;
  seatcolorcode =[
    { type : 'Wheel Chair', color: 'rgb(235, 235, 46)'},
    { type : 'Booked', color: ' #bada55'},
    { type : 'Infant', color: 'rgb(71, 198, 230)'},
    { type : 'Vaccent', color: '#e94d5a'},
  ]
  dropdownSettings: { singleSelection: boolean; idField: string; textField: string; itemsShowLimit: number; allowSearchFilter: boolean; };
  dropdownList: { Id: number; Services: string; }[];
  selectedperson: any;

  constructor(private service: AppService, private router: Router) { }

  ngOnInit(): void {

    this.dropdownSettings = {
      singleSelection: true,
      idField: 'Id',
      textField: 'Services',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
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
      this.dropdownList = this.passenger_data.map((x, i)=>{
        return {Id: i,Services: x.passengerName};
      })
    })
  }



  checkPassengerType(seat){
    var detailsbasedonseat= null;
    var data = this.passenger_data
     data.filter(x=>{
      if(x.seatNumber == seat){
         detailsbasedonseat = x.type
      }
    })
    return detailsbasedonseat;
  }

  chekinPassenger(){
    var selectedpassenger = this.passenger_data.filter(x=>x.passengerName == this.selectedperson)

    if(selectedpassenger.length != 0){
        if(selectedpassenger[0].seatNumber ==""){
          this.passenger_data = this.passenger_data.filter(x=>{
            return x.seatNumber = x.passengerName == this.selectedperson ? this.selectedseat : x.seatNumber
          })
          this.bookedseat.nativeElement.click()
        }else{
          if(confirm("Seat is already allocated to passenger. Are you sure you want to deallocate seat " + selectedpassenger[0].seatNumber
          + " and allocate seat " + this.selectedseat + ' to passenger ' + selectedpassenger[0].passengerName +' ?' )){
            this.passenger_data = this.passenger_data.filter(x=>{
              return x.seatNumber = x.passengerName == this.selectedperson ? this.selectedseat : x.seatNumber
            })
          }else{
            this.bookedseat.nativeElement.click()
          }
        }
    }else{
      alert("Invalid Passenger!")
    }
  }

  getSelectedSeat(seat){
    this.selectedseat = seat;

    if(this.checkPassengerType(this.selectedseat) != null){

     if( confirm("Seat is already allocated. Are you sure you want to deallocate this seat?")){
      this.passenger_data = this.passenger_data.filter(x=>{

        if( x.seatNumber == seat){
          x.seatNumber = ""
        }
        return x;
     })
    }

    }
    else  if(seat == 'X'){
      alert("This seat is not available for booking!!")
    }else{
      this.bookedseat.nativeElement.click()
    }
  }

  onPersonSelect(e){
    this.selectedperson = e.Services;
  }

}
