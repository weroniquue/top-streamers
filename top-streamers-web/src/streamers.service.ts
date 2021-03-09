import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Streamer} from './app/streamer-list/streamer-list.component';
import {StreamerEditDTO} from './app/streamer-edit/streamer-edit.component';

@Injectable({
  providedIn: 'root'
})
export class StreamersService {

  constructor(private http: HttpClient) { }

  getStreamerList(channelName?: string): Observable<Streamer[]> {
    const channelString = channelName ? `?channel=${channelName}` : '';
    return this.http.get<Streamer[]>(`http://localhost:8080/streamers${channelString}`);
  }

  getStreamerById(id: string): Observable<Streamer> {
    return this.http.get<Streamer>(`http://localhost:8080/streamers/${id}`);
  }

  deleteStreamer(id: string): Observable<any> {
    return this.http.delete(`http://localhost:8080/streamers/${id}`);
  }

  updateStreamer(data: StreamerEditDTO, id: string): Observable<any> {
    return this.http.put(`http://localhost:8080/streamers/${id}`, data);
  }

  addStreamer(data: StreamerEditDTO): Observable<any> {
    return this.http.post(`http://localhost:8080/streamers`, data);
  }

  getLanguageStatistics(): Observable<any> {
    return this.http.get<Streamer>('http://localhost:8080/streamers/avg-viewers-language');
  }

  getViewershipStatistics(): Observable<any> {
    return this.http.get<Streamer>('http://localhost:8080/streamers/avg-viewers');
  }

}
