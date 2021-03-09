import { NgModule } from '@angular/core';
import {StreamerListComponent} from './streamer-list/streamer-list.component';
import {StreamerEditComponent} from './streamer-edit/streamer-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {StatisticsComponent} from './statistics/statistics.component';

const routes: Routes = [
  { path: '', component: StreamerListComponent },
  { path: 'edit', component: StreamerEditComponent },
  { path: 'edit/:id', component: StreamerEditComponent },
  { path: 'stats', component: StatisticsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
