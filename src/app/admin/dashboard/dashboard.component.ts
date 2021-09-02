import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';
import { data } from 'jquery';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  myDpOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'dd/mm/yyyy'
    // other options are here...
  };


  passenger_data: any;
  @ViewChild("editModal", { static: false }) editModal: ElementRef
  @ViewChild("deleteModal", { static: false }) deleteModal: ElementRef
  editForm: FormGroup;
  title: any;
  Header: any;
  AncillaryServices = ["Meals", "Small Meals", "Baggage", "Drinks", "Water", "Perfume", "Snacks", "Pizza", "Chocolates"]



  dropdownList = [{ Id: 1, Services: "Meals" }, { Id: 2, Services: "Small Meals" }, { Id: 3, Services: "Baggage" }, { Id: 4, Services: "Drinks" }, { Id: 5, Services: "Water" },
  { Id: 6, Services: "Perfume" }, { Id: 7, Services: "Snacks" }, { Id: 8, Services: "Pizza" }, { Id: 9, Services: "Chocolates" }];
  allfields: boolean;
  flightnumber: any = '';
  filteredData: any;
  dropdownSettings = {};
  // flightnumber: any;
  dtOptions: DataTables.Settings = {};

  current_index: any;

  delete_index: any;

  p: number = 1;




  constructor(private service: AppService, private fb: FormBuilder, private router: Router) { }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full',
      pageLength: 5,
      processing: true,
    };

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
    this.getTable_data();


  }

  onDateChanged(event: IMyDateModel): void {
    // date selected
  }

  changeTable(e) {

    this.flightnumber = e
    this.filteredData = this.passenger_data.filter(x => x.FlightNumber == e)


  }

  filterpassport(e) {
    this.filteredData = this.passenger_data.filter(x => x.passportNumber == e)
  }

  filteraddress(e) {
    this.filteredData = this.passenger_data.filter(x => x.address == e)
  }

  filterdob(e) {
    this.filteredData = this.passenger_data.filter(x => x.dob == e)
  }

  getTable_data() {
    this.service.getDashboard_data().subscribe(data => {

      this.filteredData = []
      this.passenger_data = data;
      this.filteredData = data;


    })
  }

  editData(e, i) {
    console.log(e)
    this.Header = "Update Passenger Data"
    this.title = "Edit Passenger"
    this.editModal.nativeElement.click();
    this.current_index = this.passenger_data.findIndex(x => x.passportNumber == e.passportNumber);

    console.log(this.passenger_data)

    this.editForm.patchValue({

      'name': e.passengerName,
      'number': e.passportNumber,
      'dob': this.formatDate(new Date(e.dob)),
      'services':e.services.split(','),
      'address': e.address
    })

  }
  addData() {
    this.Header = "Add Passenger Data"
    this.title = "Add Passenger"
  }
  AddorEdit() {

    if (this.editForm.valid) {
      console.log(this.editForm.value)

      this.passenger_data.push({"flightName":"Indigo",
      "passengerName": this.editForm.value.name,
      "seatNumber":"5A",
      "address":this.editForm.value.address,
      "dob":this.formatDate(this.editForm.value.dob),
      "passportNumber": this.editForm.value.number,
      "services": this.editForm.value.services.map(x => x.Services).toString(),
      "type": "infant"})

      console.log(this.editForm.value.services)
      alert('Details Added')
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
  deleteData(e) {
    this.deleteModal.nativeElement.click();
    this.delete_index = this.passenger_data.findIndex(x => x.passportNumber == e.passportNumber)
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  editdata() {


    if (this.editForm.valid) {
      console.log(this.editForm.value)
      this.passenger_data[this.current_index].passengerName = this.editForm.value.name
      this.passenger_data[this.current_index].address = this.editForm.value.address
      this.passenger_data[this.current_index].dob = this.editForm.value.dob
      this.passenger_data[this.current_index].services = this.editForm.value.services
      this.passenger_data[this.current_index].passportNumber = this.editForm.value.number

      this.editModal.nativeElement.click()
      alert('Details Updated')
      this.editForm.reset()


    } else {
      for (var landingformvalues in this.editForm.controls) {
        this.editForm.controls[landingformvalues].markAllAsTouched();
      }
    }

  }

  deleteuser() {

    this.filteredData.splice(this.delete_index, 1)

  }

  getDate(e){
    console.log(e.target.value)
    this.editForm.patchValue({
      'dob' : this.formatDate(new Date(e.target.value))
    })
  }

 formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }


}

