import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  passenger_data: any;
  @ViewChild("editModal", { static: false }) editModal: ElementRef
  @ViewChild("deleteModal", { static: false }) deleteModal: ElementRef
  editForm :FormGroup;
  title: any;
  Header: any;
  AncillaryServices=["Meals","Small Meals","Baggage","Drinks","Water","Perfume","Snacks","Pizza","Chocolates"]

 
  constructor(private service: AppService, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.editForm = this.fb.group({
      'name': ['', Validators.required],
      'number': ['', Validators.required],
      'dob': ['', Validators.required],
      'services': ['', Validators.required],
      'address': ['', Validators.required]
    })
    this.getTable_data();
   
  }
 
  getTable_data(){
    this.service.getDashboard_data().subscribe(data =>{
      console.log(data);
      this.passenger_data = data;
    })
  }
 
  editData(){
    this.Header = "Update Passenger Data"
    this.title = "Edit Passenger"
    this.editModal.nativeElement.click();
  }
  addData(){
    this.Header = "Add Passenger Data"
    this.title = "Add Passenger"
  }
  AddorEdit(){
    if(this.editForm.valid){
          console.log(this.editForm)
        } else {
          for (var landingformvalues in this.editForm.controls) {
            this.editForm.controls[landingformvalues].markAllAsTouched();
          }
        }
  }
  close(){
    this.editForm.reset()
  }
  deleteData(){
    this.deleteModal.nativeElement.click();
  }
}

