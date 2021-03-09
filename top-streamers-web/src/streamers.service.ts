import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Streamer} from './app/app.component';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StreamersService {

  constructor(private http: HttpClient) { }

  getStreamerList(channelName?: string): Observable<Streamer[]> {
    const channelString = channelName ? `?channel=${channelName}` : '';
    return this.http.get<Streamer[]>(`http://localhost:8080/streamers${channelString}`);
  }

  deleteStreamer(id: string): Observable<any> {
    return this.http.delete(`http://localhost:8080/streamers/${id}`);
  }
}
