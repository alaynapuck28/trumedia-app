import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { PlayersServiceService } from '../players-service.service';
import { Location }                 from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { DatePipe } from '@angular/common';

import {switchMap} from 'rxjs/operators'

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  player =[]
  ydsPerAtt:any;
  compPercent: any;
  gameDate:any;
  chart : any =[];

  constructor( 
    private route: ActivatedRoute, 
    private playersService: PlayersServiceService,   
    private location: Location,  
    public datepipe: DatePipe
    ) { 
    Chart.register(...registerables)
  }

  ngOnInit(): void {
    if(window.localStorage.token){
      this.route.paramMap
      .pipe(switchMap((params: ParamMap) => this.playersService.getPlayerDetail(+params.get('id'), window.localStorage.token)))
      .subscribe(data =>  {
        this.player = data;
        this.ydsPerAtt = this.player.map((single) => {
          console.log(single);
          return single.PsYds/single.Att
        })
        this.compPercent = this.player.map((single) => {
          console.log(single);
          let compPerc = single.Cmp/single.Att
          return compPerc.toFixed(2);
        })
        this.gameDate = this.player.map((single) => {
          return this.datepipe.transform(single.gameDate, 'MM/dd/yyyy') 
        })

   //create chart
    this.chart = new Chart('canvas', {
      type: 'line',
       data: {
        labels: this.gameDate,
        datasets: [{
          label: 'Game Dates',
          data: this.ydsPerAtt,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
        }]
      }
    })

    this.chart = new Chart('otherCanvas', {
      type: 'line',
       data: {
        labels: this.gameDate,
        datasets: [{
          label: 'Game Dates',
          data: this.compPercent,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
        }],
        
      }
    })
  });
  }
  
  }

  goBack(): void {
    this.location.back();
  }

}
