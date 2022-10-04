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
  //modifyTriggered = false;
  //showList = true;

  constructor(private messageService: MessageService){
    
  }
//listening to the addClicked event as explained on https://angular.io/guide/component-interaction, parent listening to child event, shows the add and hides the main view
  // onModifyClicked(event){
  //   alert(event.id);
  //   this.setBooleans(false);
  // }

  //Listening to the SaveClicked event - will show the main view and hide the add
  onSaveClicked(){
   // this.setBooleans(true);
  }
  
  // setBooleans(visibility: boolean){
  //   this.modifyTriggered = !visibility;
  //   this.showList = visibility;
  // }
}
