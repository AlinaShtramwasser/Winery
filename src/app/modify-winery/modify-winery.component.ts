import { Component, OnInit, OnDestroy} from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IWinery, Winery } from '../winery';
import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import {InputTextModule} from 'primeng/inputtext';
import { ActivatedRoute, Router } from '@angular/router';
import { WineryService } from '../winery.service';
import { MessageService } from 'primeng/api';
import { __metadata } from 'tslib';

@Component({
  templateUrl: './modify-winery.component.html',
  styleUrls: ['./modify-winery.component.css']
})

export class ModifyWineryComponent implements OnInit, OnDestroy {
  wineryForm: FormGroup;
  winery: IWinery;
  urlErrorMessage: string;
  emailErrorMessage: string;
  pageTitle: string;
  id: string;
  _router: Router;
  private getSubscription: Subscription | undefined;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _data: WineryService,
    private _messageService: MessageService
  ) {
    this._router = router;
  }

  ngOnDestroy() {
    if (this.getSubscription) {
      this.getSubscription.unsubscribe();
    }
  }

  ngOnInit() {
    //setting up all the fields and validations
    this.wineryForm = this.fb.group({
      wineryName: ['', Validators.required],
      wineryUrl: ['', Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')],
      wineryPhone: new FormControl(),
      wineryEmail: ['', Validators.email],
      wineryRating: new FormControl(),
      wineryNotes: new FormControl()
    });

    /*If I use this it doesn't show the error when we are not focusing, I still want it to because I'm disabling the button
    const wineryNameControl = this.wineryForm.get('wineryName');
    wineryNameControl.valueChanges.subscribe(
      value=>this.setMessage(wineryNameControl, "wineryName")
    );*/

    //The below logic is to set the message a little bit later so the user has time to type
    const wineryUrlControl = this.wineryForm.get('wineryUrl');
    wineryUrlControl.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(
      value => this.setMessage(wineryUrlControl, 'wineryUrl')
    );

    const wineryEmailControl = this.wineryForm.get('wineryEmail');
    wineryEmailControl.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(
      value => this.setMessage(wineryEmailControl, 'wineryEmail')
    );

    //if I'm getting 0 then its going to be add, otherwise it's an edit
    this.getSubscription = this.route.paramMap.subscribe(
      params => {
        this.id = this.route.snapshot.paramMap.get('id');
        if (this.id === "0") {
          this.pageTitle = 'Add Winery';
        } else {
          this.pageTitle = 'Edit Winery';
          this.getWinery(this.id);
        }
      }
    );
  }

  getWinery(id: string): void {
    this.getSubscription =
      this._data.getWinery(id)
        .subscribe({
          next: (winery: IWinery) => this.displayWinery(winery),
          error: (err: Error) => this.serviceErrorHandler(`${this._data}.getWinery(id):`, err.message)
        });
  }


  displayWinery(winery: IWinery): void {
    if (this.wineryForm) {
      this.wineryForm.reset();
    }
    this.winery = winery;
    // Update the data on the form
    this.wineryForm.patchValue({
      wineryName: this.winery.Name,
      wineryUrl: this.winery.Url,
      wineryPhone: this.winery.Phone,
      wineryEmail: this.winery.Email,
      wineryRating: this.winery.Rating,
      wineryNotes: this.winery.Notes
    });
  }


  // Handle an error from the data service.
  //
  serviceErrorHandler(where: string, error: string) {
    this._messageService.add({
      key: 'app', sticky: true,
      severity: 'error', summary: 'Winery Modification Error', detail: error || 'Server error'
    });
  }


  setMessage(control: AbstractControl, name: string): void {
    this.urlErrorMessage = this.emailErrorMessage = '';
    if ((control.touched || control.dirty) && control.errors) {
      // if (name === "wineryName"){
      //   this.errorMessage = "Please enter a winery name";
      // }
      if (name === "wineryUrl") {
        this.urlErrorMessage = "Plase enter a valid url";
      }
      else {
        this.emailErrorMessage = "Please enter a valid email";
      }
    }
  }

  save(): void {
    //validation is OK
    if (this.wineryForm.valid) {
      //changes exist
      if (this.wineryForm.dirty) {

        var rating = this.wineryForm.get("wineryRating").value === null ? 0 : this.wineryForm.get("wineryRating").value;
        this.winery = new Winery("",
          this.wineryForm.get("wineryName").value,
          "",
          this.wineryForm.get("wineryUrl").value,
          this.wineryForm.get("wineryPhone").value,
          this.wineryForm.get("wineryEmail").value,
          "",
          rating,
          this.wineryForm.get("wineryNotes").value);
        //var userEnteredData = JSON.stringify(this.wineryForm.value);
        // console.log("winery info:", userEnteredData);
        //we create an object that is based on the existing winery (the original object has more fields than the form, eg. id), then we copy over the values from the form
        if (this.id === "0") {
          //new winery save
          this._data.createWinery(this.winery)
            .subscribe({
              next: () => this.OnSaveComplete(),
              error: (err: Error) => this.serviceErrorHandler(`${this._data}.createWinery(winery):`, err.message)
            });
        } else {
          this.winery.Id = this.id;
          this.winery.Rating = rating;
          const data = { ...this.winery, ...this.wineryForm.value };
          //existing winery edit
          this._data.updateWinery(data)
            .subscribe({
              next: () => this.OnSaveComplete(),
              error: (err: Error) => this.serviceErrorHandler(`${this._data}.updateWinery(winery):`, err.message)
            });
        }
      } else {
        this.OnSaveComplete();
      }
    }
  }
  
  OnSaveComplete(): void {
    //reset the flags otherwise it will think its dirty and has unsaved changed
    this.wineryForm.reset();
    this.router.navigate(['/wineries']);
  }
}
