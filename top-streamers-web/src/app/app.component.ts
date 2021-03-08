import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Streamer {
  id?: string;
  channel?: string;
  watchTime?: number;
  streamTime?: number;
  peakViewers?: number;
  avgViewers?: number;
  followers?: number;
  followersGained?: number;
  viewsGained?: number;
  partnered?: boolean;
  mature?: boolean;
  language?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  state: {
    streamers: Streamer[]
  };

  constructor(private http: HttpClient) {
    this.state = { streamers: null };
  }

  ngOnInit(): void {
    this.getStreamerList().subscribe(streamers => {
      console.log(streamers);
      this.state.streamers = streamers.slice(0, 101);
    });
  }

  private getStreamerList(): Observable<Streamer[]> {
    return this.http.get<Streamer[]>('http://localhost:8080/streamers');
  }



}
