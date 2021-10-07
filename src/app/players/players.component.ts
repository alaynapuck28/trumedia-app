import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {PlayersServiceService} from '../players-service.service';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  prod = environment.production;
  token = ''
  players = []
  apiKey = environment.API_KEY

  constructor(private http: HttpClient, private router: Router, private playersService: PlayersServiceService) { }
  ngOnInit() {

   
   // token exists make api call for players, 
    //if doesn't exist fetch token and then fetch players
    let dateString = window.localStorage.expires 
    let tokenExp = new Date(dateString);
    let today = new Date();

    if (!window.localStorage.token || today > tokenExp) {
      this.playersService.getAPIToken(this.apiKey).pipe(mergeMap(data => {
        console.log(data);
        this.token = data.token;
        window.localStorage.setItem('token', data.token);
        window.localStorage.setItem('expires', data.expires)
        return this.playersService.getAllPlayers(this.token)
      })).subscribe(data => {
        this.players = [...data]
      });

    }else {
      this.token = window.localStorage.token;
      this.getAllPlayers();
    }
    
  }

  getAllPlayers(): void {
    this.playersService
        .getAllPlayers(this.token)
        .subscribe(data =>  this.players = [...data]);
  }
 

  goToDetail(playerId){
    console.log(playerId)
    this.router.navigate(['/player', playerId])
  }


}

