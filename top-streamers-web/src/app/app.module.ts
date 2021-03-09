import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import { StreamerEditComponent } from './streamer-edit/streamer-edit.component';
import { AppRoutingModule } from './app-routing.module';
import { StreamerListComponent } from './streamer-list/streamer-list.component';
import { StatisticsComponent } from './statistics/statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    StreamerEditComponent,
    StreamerListComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
