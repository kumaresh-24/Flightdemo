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
  editForm :FormGroup
  allFlights: Object;

  constructor(private service: AppService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      'name': ['', Validators.required],
      'services': ['', Validators.required],
      'address': ['', Validators.required]
    })
    this.getFlightDetails();
  }



  getFlightDetails(){
    this.service.getFlightDetails().subscribe(data => {
      this.allFlights = data;
      console.log(this.allFlights)
    })
  }

  showFlight(flight){
    this.service.passFlightDetails(flight);
    this.router.navigate(['/flight-in'])
  }

}
