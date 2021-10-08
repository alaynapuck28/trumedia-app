import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { PlayersServiceService } from '../players-service.service';
import { Chart, registerables } from 'chart.js';
import { DatePipe } from '@angular/common';
import {switchMap} from 'rxjs/operators';

interface Player {
  Att: number;
  Cmp: number;
  Int: number;
  PsTD: number;
  PsYds: number;
  RshTD: number;
  RshYds: number;
  Rush: number;
  Sack: number;
  fullName: string;
  gameDate: string;
  opponent: string;
  opponentImage: string;
  playerId: number;
  playerImage: string
  seasonYear: number;
  team: string;
  teamImage: string;
  week: number;
}



@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  player:Player[];
  ydsPerAtt:any;
  compPercent: any;
  gameDate:any;
  singlePlayer: any;
  chart : any =[];
  active = 1;

  constructor( 
    private route: ActivatedRoute, 
    private playersService: PlayersServiceService,    
    public datepipe: DatePipe,
    ) { 
    Chart.register(...registerables)
  }

  ngOnInit(): void {
    if(window.localStorage.token){
      this.route.paramMap
      .pipe(switchMap((params: ParamMap) => this.playersService.getPlayerDetail(+params.get('id'), window.localStorage.token)))
      .subscribe(data =>  {
        this.player = data;
        this.singlePlayer = this.player[0];
        this.ydsPerAtt = this.player.map((single) => single.PsYds/single.Att)
        this.compPercent = this.player.map((single) => {
          let compPerc = (single.Cmp/single.Att) * 100
          return compPerc.toFixed(2);
        })
        this.gameDate = this.player.map((single) => this.datepipe.transform(single.gameDate, 'MM/dd') 
        )

    this.makeChart1();
    this.makeChart2();
    
  });
  }
 
  }

  makeChart1(){
       //create chart
       this.chart = new Chart('canvas', {
        type: 'line',
         data: {
          labels: this.gameDate,
          datasets: [{
            label: 'Yds/ATT by Game',
            data: this.ydsPerAtt,
            fill: true,
            borderColor: 'rgb(75, 192, 192)',
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
                title: {
                  display: true,
                  text:'YDS/ATT'
                } 
            },
            x: {
              title: {
                display: true,
                text:'Game Dates'
              },
          }}  
      }})
  }
  makeChart2(){this.chart = new Chart('otherCanvas', {
    type: 'line',
     data: {
      labels: this.gameDate,
      datasets: [{
        label: 'CMP% by Game',
        data:this.compPercent,
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
      }],  
     },
     options: {
       responsive: true,
       maintainAspectRatio: false,
       scales: {
        y: {
            title: {
              display: true,
              text:'CMP%'
            },
            ticks: {
                // Include a dollar sign in the ticks
                callback: function(value, index, values) {
                    return value + '%';
                },
            }  
        },
        x: {
          title: {
            display: true,
            text:'Game Dates'
          },
      }}
    },
  })

  }
}
