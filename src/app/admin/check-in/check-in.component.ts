import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss']
})
export class CheckInComponent implements OnInit {
  passenger_data: any;

  constructor(private service: AppService) { }

  ngOnInit(): void {
    this.getTable_data()
  }

  getTable_data(){
    this.service.getDashboard_data().subscribe(data =>{
      console.log(data);
      this.passenger_data = data;
    })
  }

  bookseat(passenger){

  }

}
