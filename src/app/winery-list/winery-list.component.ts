import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { WineryService } from '../winery.service';

@Component({
	selector: 'app-winery-list',
	templateUrl: './winery-list.component.html',
	styleUrls: ['./winery-list.component.scss']
})

export class WineryListComponent implements OnInit, OnDestroy {

	private getAllSubscription: Subscription | undefined;
	codeName = 'winery-grid';
	wineries = [];

	totalRecords: number = 0;
	alternativeUrl: string = "assets/images/wineryLogo.jpg"
	/*
	** On component creation (inject services).
	*/
	constructor(
		private _messageService: MessageService,
		// to talk to the web server
		private _data: WineryService,
	) { }

	/*
	** On component initialization, get all data from the data service.
	*/
	ngOnInit() {
		// load all records
		this.getAllWineries();
	}

	ngOnDestroy(): void {
		if (this.getAllSubscription) {
			this.getAllSubscription.unsubscribe();
		}
	}

	OnSaveComplete(): void {
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
	SaveRating(event: any, id: string) {

		this._data.updateRating(id, event.value)
			.subscribe({
				error: (err: Error) => this.serviceErrorHandler(`${this._data}.updateRating(id, ratingID):`, err.message)
			});
	}

	//deleting
	DeleteWinery(id: string) {
		this._data.deleteWinery(id)
			.subscribe({
				next: () => this.OnSaveComplete(),
				error: (err: Error) => this.serviceErrorHandler(`${this._data}.deleteWinery(id, ratingID):`, err.message)
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
