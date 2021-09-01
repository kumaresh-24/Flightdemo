import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-in-flight',
  templateUrl: './in-flight.component.html',
  styleUrls: ['./in-flight.component.scss']
})
export class InFlightComponent implements OnInit {

  @ViewChild("seatModal", { static: false }) seatModal: ElementRef
  passengers: any[] = [];
  p: number = 1;
  dropdownSettings = {};
  editForm: FormGroup;
  allservices: any[]=[]

  dropdownList = [{ Id: 1, Services: "Meals" }, { Id: 2, Services: "Small Meals" }, { Id: 3, Services: "Baggage" }, { Id: 4, Services: "Drinks" }, { Id: 5, Services: "Water" },
  { Id: 6, Services: "Perfume" }, { Id: 7, Services: "Snacks" }, { Id: 8, Services: "Pizza" }, { Id: 9, Services: "Chocolates" }];

  flightSeatsSequence = [
    ['1A', '1B', '1C', '1D', '1E', '1F'],
    ['2A', '2B', '2C', '2D', '2E', '2F'],
    ['3A', '3B', '3C', '3D', '3E', '3F'],
    ['4A', '4B', '4C', '4D', '4E', '4F'],
    ['5A', '5B', '5C', '5D', '5E', '5F'],
    ['6A', '6B', '6C', '6D', '6E', '6F'],
    ['7A', '7B', '7C', '7D', '7E', '7F'],
    ['8A', '8B', '8C', '8D', '8E', '8F'],
  ]
  mealseat: any;
  selectedmeal: any;
  selectedseat: any;
  seatcolorcode =[
    { type : 'Meals', color: 'rgb(71, 230, 177)'},
    { type : 'Small Meals', color: 'rgb(221, 245, 83)'},
  ]

  constructor(private service: AppService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'Id',
      textField: 'Services',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };

    this.editForm = this.fb.group({
      'services': ['', Validators.required],
    })

    this.getPassengers()

  }

  getPassengers() {
    this.service.getDashboard_data().subscribe(data => {
      console.log(data);
      this.passengers = data;
    })
  }


  checkPassengerMeals(seat) {

    var detailsbasedonseat = null;
    var data = this.passengers
    data.filter(x => {
      if (x.seatNumber == seat) {
        detailsbasedonseat = x?.meals
      }
    })
    return detailsbasedonseat;
  }

  checkPassengerSmallMeals(seat) {
    var detailsbasedonseat = null;
    var data = this.passengers
    data.filter(x => {
      if (x.seatNumber == seat) {
        detailsbasedonseat = x?.smallmeals
      }
    })
    return detailsbasedonseat;


  }



  getSelectedSeat(seat) {
    this.selectedseat = seat;
    // console.log(this.checkPassengerMeals(this.selectedseat))
    if (this.checkPassengerMeals(this.selectedseat) == null && this.checkPassengerSmallMeals(this.selectedseat) == null) {
      alert("This seat is not booked by any passenger, so you cannot opt or change your services")
    }
    else if ( this.checkPassengerSmallMeals(this.selectedseat) == "Yes") {
      if (confirm("Small Meal is already opted. Are you sure you want to remove this small meal?")) {
        this.passengers = this.passengers.filter(x => {

          if (x.seatNumber == seat) {
            var allservices = x.services.split(",")
           allservices = allservices.filter(y=>y != "Small Meals")

           x.smallmeals ="No"
           x.services = allservices.toString()

          }

          return x;
        })
      }
    }

    else if(this.checkPassengerMeals(this.selectedseat) == "Yes"){
      if (confirm("Meal is already opted. Are you sure you want to remove this meal?")) {
        this.passengers = this.passengers.filter(x => {

          if (x.seatNumber == seat) {
            var allservices = x.services.split(",")
           allservices = allservices.filter(y=>y != "Meals")

           x.meals ="No"
           x.services = allservices.toString()
          }

          return x;
        })
      }
    }

      else {
        this.seatModal.nativeElement.click()

      }


  }

  AddMeals() {
    var passengerseat = this.passengers.filter(x => x.seatNumber == this.selectedseat)
     if(this.editForm.valid){
        this.passengers = this.passengers.filter(x => {
          if (x.seatNumber == this.selectedseat) {

            this.allservices = x.services.split(",")

            this.allservices.push("Small Meals")
           x.smallmeals ="Yes"
           x.services = this.allservices.join()

          }
          return x;
        })
        this.seatModal.nativeElement.click()
        this.editForm.reset()
    }
    else{
      for (var landingformvalues in this.editForm.controls) {
        this.editForm.controls[landingformvalues].markAllAsTouched();
      }
    }
  }

  onItemSelect(item: any) {
    // console.log(item);
  }
  onSelectAll(items: any) {
    // console.log(items);
  }
  close() {
    this.editForm.reset()
  }


}
