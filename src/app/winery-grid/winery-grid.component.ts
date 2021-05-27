// ===========================================================================
// File: winery-grid.component.ts
import { Component, OnInit, OnDestroy, Input, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TableModule } from 'primeng/table';
import { Message, MessageService, ConfirmationService } from 'primeng/api';

import { WineryService } from '../winery.service';
import { IWinery, Winery } from '../winery';

@Component({
	selector: 'app-winery-grid',
	templateUrl: './winery-grid.component.html',
	styleUrls: ['./winery-grid.component.css']
})
export class WineryGridComponent implements OnInit, OnDestroy {
	/*
	** --------------------------------------------------------------------
	** Local variables declaration:
	** Window/dialog communication (also see closeWin event)
	*/
	private getAllSubscription: Subscription | undefined;
	codeName = 'winery-grid';
	wineries: IWinery[] = [];
	totalRecords: number = 0;
	/*
	** On component creation (inject services).
	*/
	constructor(
		private _messageService: MessageService,
		// communicate to the http web service
		private _data: WineryService
	) {
	}
	/*
	** On component initialization, get all data from the data service.
	*/
	ngOnInit() {
		// load all records
		this.getAllWineries();
	}
	//
	ngOnDestroy() {
		if (this.getAllSubscription) {
			this.getAllSubscription.unsubscribe();
		}
	}
	/*
	** --------------------------------------------------------------------
	** File access: getAll
	*/
	getAllWineries( ): void {
		this.getAllSubscription =
			this._data.getWineries().subscribe((wineryData) => {
				this.wineries = wineryData;
				this.totalRecords = this.wineries.length;
			}, ( error ) => this.serviceErrorHandler(
					`${this.codeName}.getAllWineries:`, error ));
	}
	//
	// Handle an error from the data service.
	//
	serviceErrorHandler( where: string, error: string ) {
		this._messageService.add({key: 'app', sticky: true,
			severity:'error', summary:'Error', detail: error || 'Server error' });
	}
	//
}
// End of winery-grid.component.ts
// ===========================================================================
