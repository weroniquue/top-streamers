import { Component, OnInit } from '@angular/core';
import {StreamersService} from '../../streamers.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  state: {
    isLoadingData: boolean;
    statistics: any[];
  };

  constructor(private streamersService: StreamersService,
              private router: Router) {
    this.state = { isLoadingData: true, statistics: null};
  }

  ngOnInit(): void {
    this.streamersService.getStatistics().subscribe(result => {
      console.log(result);
      this.state.statistics = Object.keys(result)
        .map(lang => ({ language: lang, avgViewers: result[lang]}))
        .sort((a, b) => {
          return (a.avgViewers < b.avgViewers)
          ? 1
          : (a.avgViewers > b.avgViewers)
            ? -1
            : 0;
        });
      this.state.isLoadingData = false;
    });
  }

  onGoBack(): void {
    this.router.navigate(['/']);
  }

}
