import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Location }                 from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'trumedia-project';
 

  constructor(private http: HttpClient, private location: Location) { }
  ngOnInit() {

  }
  goBack(): void {
    this.location.back();
  }

}