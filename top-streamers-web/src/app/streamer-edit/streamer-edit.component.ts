import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Streamer} from '../streamer-list/streamer-list.component';
import {FormControl, FormGroup} from '@angular/forms';
import {StreamersService} from '../../streamers.service';

export interface StreamerEditDTO {
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
  selector: 'app-streamer-edit',
  templateUrl: './streamer-edit.component.html',
  styleUrls: ['./streamer-edit.component.css']
})
export class StreamerEditComponent implements OnInit {

  state: {
    data: Streamer;
    isNewStreamer: boolean;
  };

  streamerForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private streamersService: StreamersService,
              private router: Router) {
    this.state = { data: null, isNewStreamer: null };
    this.initForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const streamerId = params.id;
      if (streamerId) {
        this.streamersService.getStreamerById(streamerId).subscribe(streamer => {
          this.state.data = streamer;
          this.state.isNewStreamer = false;
          this.patchFormValue(this.state.data);
        });
      } else {
        this.state.isNewStreamer = true;
      }
    });
  }

  private initForm(): void {
    this.streamerForm = new FormGroup({
      channel: new FormControl(null, []),
      watchTime: new FormControl(null, []),
      streamTime: new FormControl(null, []),
      peakViewers: new FormControl(null, []),
      avgViewers: new FormControl(null, []),
      followers: new FormControl(null, []),
      followersGained: new FormControl(null, []),
      viewsGained: new FormControl(null, []),
      partnered: new FormControl(null, []),
      mature: new FormControl(null, []),
      language: new FormControl(null, []),
    });
  }

  private patchFormValue(streamer: Streamer): void {
    this.streamerForm.patchValue({
      channel: streamer.channel,
      watchTime: streamer.watchTime,
      streamTime: streamer.streamTime,
      peakViewers: streamer.peakViewers,
      avgViewers: streamer.avgViewers,
      followers: streamer.followers,
      followersGained: streamer.followersGained,
      viewsGained: streamer.viewsGained,
      partnered: streamer.partnered,
      mature: streamer.mature,
      language: streamer.language
    });
  }

  onBack(): void {
    this.router.navigate(['/']);
  }

  onSubmit(): void {
    const data: StreamerEditDTO = this.streamerForm.getRawValue();
    if (this.state.isNewStreamer) {
      this.streamersService.addStreamer(data).subscribe(_ => {
        this.onBack();
      });
    } else {
      this.streamersService.updateStreamer(data, this.state.data.id).subscribe(_ => {
        this.onBack();
      });
    }
  }

}
