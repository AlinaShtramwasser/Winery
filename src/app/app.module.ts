
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { WineryListComponent } from './winery-list/winery-list.component';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
//import {OrderListModule} from 'primeng/orderlist';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';

@NgModule({
  declarations: [				
    AppComponent,
    WineryGridComponent,
    WineryListComponent,
   ],
  imports: [
    BrowserModule,
    //OrderListModule,
    VirtualScrollerModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: "", component: WineryGridComponent }
    ]),
    TableModule,
    ToastModule,
    BrowserAnimationsModule,
    AngularMaterialModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
