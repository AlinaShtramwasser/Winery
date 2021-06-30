import { Component } from '@angular/core';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Winery Log';

  constructor(private messageService: MessageService){
    
  }
}
