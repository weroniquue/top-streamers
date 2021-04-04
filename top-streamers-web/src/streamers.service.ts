import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Streamer} from './app/streamer-list/streamer-list.component';
import {StreamerEditDTO} from './app/streamer-edit/streamer-edit.component';
import { environment } from './environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StreamersService {

  constructor(private http: HttpClient) { }

  getStreamerList(channelName?: string): Observable<Streamer[]> {
    const channelString = channelName ? `?channel=${channelName}` : '';
    return this.http.get<Streamer[]>(`${environment.apiUrl}/streamers${channelString}`);
  }

  getStreamerById(id: string): Observable<Streamer> {
    return this.http.get<Streamer>(`${environment.apiUrl}/streamers/${id}`);
  }

  deleteStreamer(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/streamers/${id}`);
  }

  updateStreamer(data: StreamerEditDTO, id: string): Observable<any> {
    return this.http.put(`${environment.apiUrl}/streamers/${id}`, data);
  }

  addStreamer(data: StreamerEditDTO): Observable<any> {
    return this.http.post(`${environment.apiUrl}/streamers`, data);
  }

  getLanguageStatistics(): Observable<any> {
    return this.http.get<Streamer>(`${environment.apiUrl}/streamers/avg-viewers-language`);
  }

  getViewershipStatistics(): Observable<any> {
    return this.http.get<Streamer>(`${environment.apiUrl}/streamers/avg-viewers`);
  }

}
