import { Injectable } from '@angular/core';
import { environment } from '../../src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})

export class PlayersServiceService {
  token: any;

  constructor(private http: HttpClient) { }


  getAPIToken(){    
  return this.http.get<any>('apiToken')
  .pipe(catchError ((response:any)=> {
  return throwError(response.error)
}))

}

  getAllPlayers(token: string): Observable<any[]> {
    const headers = { 'tempToken': token}
    return this.http.get<any>('https://project.trumedianetworks.com/api/nfl/players', { headers })
    .pipe(catchError ((response:any)=> {
      return throwError(response.error)
    }))
  }

  getPlayerDetail(id: number, token: string): Observable<any> {
    const headers = { 'tempToken': token}
    const url = 'https://project.trumedianetworks.com/api/nfl/player/'+ id
    console.log(url);
    return this.http.get<any>(url, { headers })
    .pipe(catchError ((response:any)=> {
      return throwError(response.error)
    }))
    
  }

}
