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
    otherStatistics: any[];
  };

  constructor(private streamersService: StreamersService,
              private router: Router) {
    this.state = { isLoadingData: true, statistics: null, otherStatistics: null};
  }

  ngOnInit(): void {
    this.streamersService.getLanguageStatistics().subscribe(result => {
      this.state.statistics = Object.keys(result)
        .map(lang => ({ language: lang, avgViewers: result[lang]}))
        .sort((a, b) => {
          return (a.avgViewers < b.avgViewers)
          ? 1
          : (a.avgViewers > b.avgViewers)
            ? -1
            : 0;
        });
      this.streamersService.getViewershipStatistics().subscribe(otherResult => {
        this.state.otherStatistics = Object.keys(otherResult)
          .map(key => ({ stat: key, value: otherResult[key]}));
        this.state.isLoadingData = false;
      });
    });
  }

  onGoBack(): void {
    this.router.navigate(['/']);
  }

  // returns displayed otherStatistic name
  getName(statName: string): string {
    return statName === 'mean' ? 'Mean' : statName === 'meanMature' ? 'Mean mature' : 'Mean not mature';
  }

}
