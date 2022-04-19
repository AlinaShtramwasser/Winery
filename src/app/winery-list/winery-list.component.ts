import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

import { Observable, Subscription } from 'rxjs';
import { IWinery } from '../winery';
import { WineryService } from '../winery.service';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-winery-list',
  templateUrl: './winery-list.component.html',
  styleUrls: ['./winery-list.component.scss']
})

export class WineryListComponent implements OnInit, OnDestroy {
/*
local variables
	*/
	val: number = 3;

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
		// communicate to the http web service
		private _data: WineryService
	) 
	{
		//this.val=3; was used with the ordered list will take a look later
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
