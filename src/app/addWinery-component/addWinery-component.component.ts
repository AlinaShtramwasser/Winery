import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IWinery, Winery } from '../winery';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-addWinery-component',
  templateUrl: './addWinery-component.component.html',
  styleUrls: ['./addWinery-component.component.css']
})

export class AddWineryComponentComponent implements OnInit {
  wineryForm: FormGroup;
  winery: IWinery;
  urlErrorMessage: string;
  emailErrorMessage: string;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.wineryForm = this.fb.group({
      wineryName: ['', Validators.required],
      wineryUrl:  ['',  Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')],
      wineryPhone: new FormControl(),
      wineryEmail: ['', Validators.email],
      wineryRating: new FormControl(),
    });

    /*If I use this it doesn't show the error when we are not focusing, I still want it to because I'm disabling the button
    const wineryNameControl = this.wineryForm.get('wineryName');
    wineryNameControl.valueChanges.subscribe(
      value=>this.setMessage(wineryNameControl, "wineryName")
    );*/
    
    const wineryUrlControl = this.wineryForm.get('wineryUrl');
    wineryUrlControl.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(
      value=>this.setMessage(wineryUrlControl, 'wineryUrl')
    );

    const wineryEmailControl = this.wineryForm.get('wineryEmail');
    wineryEmailControl.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(
      value=>this.setMessage(wineryEmailControl, 'wineryEmail')
    );
  }

  setMessage(control: AbstractControl, name: string): void {
    this.urlErrorMessage = this.emailErrorMessage = '';
    if ((control.touched || control.dirty) && control.errors){
      // if (name === "wineryName"){
      //   this.errorMessage = "Please enter a winery name";
      // }
      if (name === "wineryUrl"){
        this.urlErrorMessage = "Plase enter a valid url";
      }
      else {
        this.emailErrorMessage = "Please enter a valid email";
      }
    }
  }

  save(){
    var winery = JSON.stringify(this.wineryForm.value);
    console.log("winery info:", winery);
  }

}
