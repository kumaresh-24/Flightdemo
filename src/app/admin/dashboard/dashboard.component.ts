import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import {IAngularMyDpOptions, IMyDateModel} from 'angular-mydatepicker';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  myDpOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'dd.mm.yyyy'
    // other options are here...
  };
 

  passenger_data: any;
  @ViewChild("editModal", { static: false }) editModal: ElementRef
  @ViewChild("deleteModal", { static: false }) deleteModal: ElementRef
  editForm: FormGroup;
  title: any;
  Header: any;
  AncillaryServices = ["Meals", "Small Meals", "Baggage", "Drinks", "Water", "Perfume", "Snacks", "Pizza", "Chocolates"]
  
  // selectedItems = [{Id:1,Services: "Meals"},{Id:2,Services:"Small Meals"},{Id:3,Services:"Baggage"}];
  
  dropdownList = [{Id:1,Services: "Meals"},{Id:2,Services:"Small Meals"},{Id:3,Services:"Baggage"},{Id:4,Services:"Drinks"},{Id:5,Services:"Water"},
  {Id:6,Services: "Perfume"},{Id:7,Services: "Snacks"},{Id:8,Services: "Pizza"},{Id:9,Services: "Chocolates"}];
  allfields: boolean;
  flightnumber: any='';
  filteredData: any;
  dropdownSettings = {};
  // flightnumber: any;
  dtOptions: DataTables.Settings = {};




  constructor(private service: AppService, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full',
      pageLength: 4,
      processing: true,
    };

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'Id',
      textField: 'Services',
      // selectAllText: 'Select All',
      // unSelectAllText: 'UnSelect All',
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
    this.getTable_data();
  

  }

  onDateChanged(event: IMyDateModel): void {
    // date selected
  }

  changeTable(e) {
    console.log(e)
    this.flightnumber = e
    this.getTable_data();
  }

  getTable_data() {
    this.service.getDashboard_data().subscribe(data => {
      // console.log(data);
      this.filteredData = []
      this.passenger_data = data;
      if(this.flightnumber != ''){
        data.filter(x=>{
          if(this.flightnumber == x.FlightNumber){
          this.filteredData.push(x)
          console.log(this.filteredData)
          }
        })
        
      }
      else{
        this.filteredData= this.passenger_data
      }
      
    })
  }

  editData(e) {
    console.log(e)
    this.Header = "Update Passenger Data"
    this.title = "Edit Passenger"
    this.editModal.nativeElement.click();
    
    this.editForm.patchValue({

      'name': e.passengerName,
      'number': e.passportNumber,
      'dob': e.dob,
      'services':e.services,
      'address': e.address
    })

  }
  addData() {
    this.Header = "Add Passenger Data"
    this.title = "Add Passenger"
  }
  AddorEdit() {
    if (this.editForm.valid) {
      console.log(this.editForm)

      this.passenger_data.push({"flightName":"Indigo", 
      "passengerName": this.editForm.value.name, 
      "seatNumber":"5A", 
      "address":this.editForm.value.address, 
      "dob": this.editForm.value.dob, 
      "passportNumber": this.editForm.value.number, 
      "services": this.editForm.value.services,
      "type": "infant"})
      

      this.editModal.nativeElement.click();
      this.editForm.reset()
    

    } else {
      for (var landingformvalues in this.editForm.controls) {
        this.editForm.controls[landingformvalues].markAllAsTouched();
      }
    }
  }
  close() {
    this.editForm.reset()
  }
  deleteData() {
    this.deleteModal.nativeElement.click();
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
}

