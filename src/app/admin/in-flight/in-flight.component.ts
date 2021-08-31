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
  passengers: any[]=[];
  p: number = 1;
  dropdownSettings = {};
  editForm: FormGroup;

  dropdownList = [{Id:1,Services: "Meals"},{Id:2,Services:"Small Meals"},{Id:3,Services:"Baggage"},{Id:4,Services:"Drinks"},{Id:5,Services:"Water"},
  {Id:6,Services: "Perfume"},{Id:7,Services: "Snacks"},{Id:8,Services: "Pizza"},{Id:9,Services: "Chocolates"}];

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

  constructor(private service: AppService, private fb: FormBuilder,private router: Router) { }

  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'Id',
      textField: 'Services',
      itemsShowLimit: 4,
      allowSearchFilter: true
    };

    this.editForm = this.fb.group({
      'name': ['', Validators.required],
      'number': ['', Validators.required],
      'dob': ['', Validators.required],
      'services': ['', Validators.required],
      'address': ['', Validators.required]
    })

 this.getPassengers()
   
  }

  getPassengers(){
    this.service.getDashboard_data().subscribe(data=>{
      console.log(data);
      this.passengers = data;
    })
  }

  checkPassengerMeals(seat){
    
    var detailsbasedonseat = this.passengers.filter(x=>x.seatNumber == seat)
    return detailsbasedonseat[0]?.meals;
  }
  checkPassengerSmallMeals(seat){
    
    var detailsbasedonseat = this.passengers.filter(x=>x.seatNumber == seat)
    return detailsbasedonseat[0]?.smallmeals;
  }

  close() {
    this.editForm.reset()
  }

  openModal(){
    console.log("hi")
    this.seatModal.nativeElement.click()
  }
  AddorEdit() {

    if (this.editForm.valid) {
      console.log(this.editForm.value)

      this.passengers.push({ 
      "passengerName": this.editForm.value.name, 
      "services": this.editForm.value.services.map(x => x.Services).toString(),
     })
      
      console.log(this.editForm.value.services)
      alert('Details Added')
      this.seatModal.nativeElement.click();
      this.editForm.reset()
    

    } else {
      for (var landingformvalues in this.editForm.controls) {
        this.editForm.controls[landingformvalues].markAllAsTouched();
      }
    }
  }
}
