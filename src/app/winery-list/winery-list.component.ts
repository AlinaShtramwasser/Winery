import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import {ButtonModule} from 'primeng/button';
import { Subscription } from 'rxjs';
import { IWinery } from '../winery';
import { WineryService } from '../winery.service';

@Component({
  selector: 'app-winery-list',
  templateUrl: './winery-list.component.html',
  styleUrls: ['./winery-list.component.scss']
})

export class WineryListComponent implements OnInit, OnDestroy {
/*
local variables
	*/
	private getAllSubscription: Subscription | undefined;
	codeName = 'winery-grid';
	wineries: IWinery[] = [];
	totalRecords: number = 0;
  alternativeUrl: string = "assets/images/wineryLogo.jpg"
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
