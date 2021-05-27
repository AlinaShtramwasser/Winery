import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
//for fetching data from external apis and provide them to the app as a stream
import { HttpClientModule } from "@angular/common/http";
import {TableModule} from 'primeng/table';
import { WineryGridComponent } from './winery-grid/winery-grid.component';
import { WineryService } from './winery.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [			
    AppComponent,
    WineryGridComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: "", component: WineryGridComponent }
    ]),
    TableModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
