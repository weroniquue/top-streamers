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
    allStreamers: Streamer[],
    displayedStreamers: Streamer[]
  };

  constructor(private http: HttpClient) {
    this.state = { allStreamers: null, displayedStreamers: null };
  }

  ngOnInit(): void {
    this.getStreamerList().subscribe(streamers => {
      this.state.allStreamers = streamers;
      this.state.displayedStreamers = this.state.allStreamers.slice(0, 50);
    });
  }

  private getStreamerList(): Observable<Streamer[]> {
    return this.http.get<Streamer[]>('http://localhost:8080/streamers');
  }

  onShowMore(): void {
    const currentLength = this.state.displayedStreamers.length;
    this.state.displayedStreamers = this.state.displayedStreamers
      .concat(this.state.allStreamers.slice(currentLength, currentLength + 50));
  }



}
