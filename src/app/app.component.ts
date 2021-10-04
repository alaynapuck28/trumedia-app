import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'project-trumedia';
  title2;
 
  ngOnInit(){
    if(environment.API_KEY){
      this.title2 = environment.API_KEY
    }
  }
}
