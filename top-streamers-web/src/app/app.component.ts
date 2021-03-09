import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {StreamersService} from '../streamers.service';

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

  channelName: FormControl;

  constructor(private streamersService: StreamersService) {
    this.clearData();
    this.channelName = new FormControl(null, []);
  }

  ngOnInit(): void {
    this.loadData();
  }

  private clearData(): void {
    this.state = {
      allStreamers: null,
      displayedStreamers: null
    };
  }

  private loadData(channelName?: string): void {
    this.clearData();
    this.streamersService.getStreamerList(channelName).subscribe(streamers => {
      this.state.allStreamers = streamers;
      this.state.displayedStreamers = this.state.allStreamers.slice(0, 50);
    });
  }

  onShowMore(): void {
    const currentLength = this.state.displayedStreamers.length;
    this.state.displayedStreamers = this.state.displayedStreamers
      .concat(this.state.allStreamers.slice(currentLength, currentLength + 50));
  }

  onReloadData(): void {
    const channelName = this.channelName.value;
    this.loadData(channelName ? channelName : undefined);
  }

  onEdit(streamer: Streamer): void {
    // TODO go to edit component
  }

  onDelete(streamerId: string): void {
    this.streamersService.deleteStreamer(streamerId).subscribe(_ => {
      this.loadData();
    });
  }

}
