import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IWinery, Winery } from '../winery';

@Component({
  selector: 'app-addWinery-component',
  templateUrl: './addWinery-component.component.html',
  styleUrls: ['./addWinery-component.component.css']
})
export class AddWineryComponentComponent implements OnInit {
  wineryForm: FormGroup;
  winery: IWinery;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.wineryForm = this.fb.group({
      wineryName: ['', Validators.required],
      wineryUrl:  ['',  Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')],
      wineryPhone: new FormControl(),
      wineryEmail: ['', Validators.email],
      wineryRating: new FormControl(),
    });
  }

  save(){
    var winery = JSON.stringify(this.wineryForm.value);
    console.log("winery info:", winery);
  }

}
