
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import {InputTextModule} from 'primeng/inputtext';
import {InputMaskModule} from 'primeng/inputmask';
//import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {PanelModule} from 'primeng/panel';
//for fetching data from external apis and provide them to the app as a stream
import { HttpClientModule } from "@angular/common/http";
import {TableModule} from 'primeng/table';
//import { WineryGridComponent } from './winery-grid/winery-grid.component';
import { WineryService } from './winery.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { WineryListComponent } from './winery-list/winery-list.component';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
//import {OrderListModule} from 'primeng/orderlist';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import {RatingModule} from 'primeng/rating';
import { ModifyWineryComponent } from './modify-winery/modify-winery.component';
import {ButtonModule} from 'primeng/button';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
  GoogleLoginProvider
} from 'angularx-social-login';
//import { GoogleLoginProvider } from 'angularx-social-login';
@NgModule({
  declarations: [								
    AppComponent,
    //WineryGridComponent,
    WineryListComponent,
    ModifyWineryComponent,
    MatConfirmDialogComponent
   ],
  imports: [
    BrowserModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    SocialLoginModule,
    ButtonModule,
    //OrderListModule,
    VirtualScrollerModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: "", component: WineryListComponent },
      {path: 'wineries', component: WineryListComponent},
     // { path: 'wineries/:id', component: ModifyWineryComponent },
      {
        path: 'wineries/:id/edit',
      //  canDeactivate: [ProductEditGuard],
        component: ModifyWineryComponent
      }
    ]),
    TableModule,
    ToastModule,
    InputMaskModule,
    RatingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    PanelModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('523587614236-5n3m3des3ckprb697i2smu2aqomqfndp.apps.googleusercontent.com'),
          },
        ],
      } as SocialAuthServiceConfig,
    },
    MessageService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
