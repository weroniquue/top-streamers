import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {StreamersService} from '../../streamers.service';
import {Router} from '@angular/router';

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
  selector: 'app-streamer-list',
  templateUrl: './streamer-list.component.html',
  styleUrls: ['./streamer-list.component.css']
})
export class StreamerListComponent implements OnInit {

  state: {
    allStreamers: Streamer[],
    displayedStreamers: Streamer[],
    isLoadingData: boolean
  };

  channelName: FormControl;

  constructor(private streamersService: StreamersService,
              private router: Router) {
    this.clearData();
    this.channelName = new FormControl(null, []);
  }

  ngOnInit(): void {
    this.loadData();
  }

  private clearData(): void {
    this.state = {
      allStreamers: null,
      displayedStreamers: null,
      isLoadingData: true
    };
  }

  private loadData(channelName?: string): void {
    this.clearData();
    this.streamersService.getStreamerList(channelName).subscribe(streamers => {
      this.state.allStreamers = streamers;
      this.state.displayedStreamers = this.state.allStreamers.slice(0, 50);
      this.state.isLoadingData = false;
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

  onAddStreamer(): void {
    this.router.navigate([`/edit`]);
  }

  onStatistics(): void {
    this.router.navigate([`/stats`]);
  }

  onEdit(streamer: Streamer): void {
    this.router.navigate([`/edit/${streamer.id}`]);
  }

  onDelete(streamerId: string): void {
    this.streamersService.deleteStreamer(streamerId).subscribe(_ => {
      this.loadData();
    });
  }

}
