import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { DialogService } from '../dialog.service';
import { WineryService } from '../winery.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
//google authentication example from: https://www.positronx.io/angular-google-social-login-tutorial-with-example/
import {
	SocialAuthService,
	GoogleLoginProvider,
	SocialUser,
} from 'angularx-social-login';
@Component({
	selector: 'app-winery-list',
	templateUrl: './winery-list.component.html',
	styleUrls: ['./winery-list.component.scss']
})

export class WineryListComponent implements OnInit, OnDestroy {

	private getAllSubscription: Subscription | undefined;
	loginForm: FormGroup;
	codeName = 'winery-grid';
	wineries = [];
	isLoggedin?: boolean;
	emailErrorMessage: string;
	socialUser!: SocialUser;
	passwordError: boolean;
	totalRecords: number = 0;
	alternativeUrl: string = "assets/images/wineryLogo.jpg"
	/*
	** On component creation (inject services).
	*/
	constructor(
		private fb: FormBuilder,
		private _messageService: MessageService,
		// to talk to the web server
		private _data: WineryService,
		private _dialoService: DialogService,
		private socialAuthService: SocialAuthService
	) { }

	/*
	** On component initialization, get all data from the data service.
	*/
	ngOnInit() {
		// load all records
		this.getAllWineries();
		this.isLoggedin = false;
		//setting up all the fields and validations
		this.loginForm = this.fb.group({
			googlePassword: ['', Validators.required],
			googleEmail: ['', [Validators.required, Validators.email]],
		});

		this.socialAuthService.authState.subscribe((user) => {
			this.socialUser = user;
			this.isLoggedin = user != null;
			console.log(this.socialUser);
		});

		const loginEmailControl = this.loginForm.get('googleEmail');
		loginEmailControl.valueChanges.pipe(
			debounceTime(1000)).subscribe(
				value => this.setMessage({ control: loginEmailControl })
			);
	}

	login(): void {
		var emailControl = this.loginForm.get("googleEmail");
		var passwordControl = this.loginForm.get("googlePassword");
		//validation is OK
		if (this.loginForm.valid) {
			//changes exist
			if (this.loginForm.dirty) {
				this.isLoggedin = true;

				var email = emailControl.value;
				var password = passwordControl.value;
				this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
			}
		} else {
			this.setMessage({ control: emailControl });
			this.passwordError = true;
		}
	}

	setMessage({ control }: { control: AbstractControl; }): void {
		this.emailErrorMessage = '';
		if (control.errors) {
			this.emailErrorMessage = "Please enter a valid email";
		}
	}

	ngOnDestroy(): void {
		if (this.getAllSubscription) {
			this.getAllSubscription.unsubscribe();
		}
	}

	onSaveComplete(): void {
		this.getAllWineries();
	}

	//getting all the wineries
	getAllWineries(): void {

		this.getAllSubscription = this._data.getWineries().subscribe({
			next: wineries => {
				this.wineries = wineries;
				this.totalRecords = this.wineries.length;
			},
			error: (err: Error) => this.serviceErrorHandler(`${this._data}.getWinery(id):`, err.message)
		});
	}

	//saving
	saveRating(event: any, id: string) {

		this._data.updateRating(id, event.value)
			.subscribe({
				error: (err: Error) => this.serviceErrorHandler(`${this._data}.updateRating(id, ratingID):`, err.message)
			});
	}

	//deleting
	deleteWinery(id: string) {
		this._dialoService.openConfirmDialog('Are you sure you want to delete this winery?')
			.afterClosed().subscribe(res => {
				if (res) {
					this._data.deleteWinery(id)
						.subscribe({
							next: () => this.onSaveComplete(),
							error: (err: Error) => this.serviceErrorHandler(`${this._data}.deleteWinery(id, ratingID):`, err.message)
						});
				}
			});
	}


	// Handle an error from the data service.
	serviceErrorHandler(where: string, error: string) {
		this._messageService.add({
			key: 'app', sticky: true,
			severity: 'error', summary: 'Get wineries Error', detail: error || 'Server error'
		});
	}
}
