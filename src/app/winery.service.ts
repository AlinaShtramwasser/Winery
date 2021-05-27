// ===========================================================================
// File: winery.service.ts
// Service for Winery class
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
//
import { Observable, of, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';

import { IWinery, Winery } from './winery';

@Injectable( { providedIn: 'root' } )
export class WineryService {
	/*
	** --------------------------------------------------------------------
	** Data declaration.
	*/
	codeName: string;
	mockDatum: IWinery[] = [
		new Winery( 1, 'w 1', 'w 1', 'http://www.winery1.com' ),
		new Winery( 2, 'w 2', 'w 2', 'http://www.winery2.com' ),
		new Winery( 3, 'w 3', 'w 3', 'http://www.winery3.com' ),
		new Winery( 4, 'w 4', 'w 4', 'http://www.winery4.com' ),
		new Winery( 5, 'w 5', 'w 5', 'http://www.winery5.com' ),
		new Winery( 6, 'w 6', 'w 6', 'http://www.winery6.com' )
	];
	/*
	** Service constructor, inject http service.
	*/
	constructor(
		protected http: HttpClient ) {
			this.codeName = 'winery.service';
	}
	/*
	** Read (get) all Winery.
	*/
	getWineries( ): Observable<IWinery[]> {
		return of( this.mockDatum );
	}
	/*
	** General error handler, should throw a string.
	*/
	handleError( error: any ) {
		if ( error instanceof HttpErrorResponse ) {
			console.error(
				`${this.codeName}.handleError: ${JSON.stringify(error)}` );
			return throwError( error.statusText || 'Service error' );
		}
		console.error(
			`${this.codeName}.handleError: ${error}` );
		return throwError( error.toString() || 'Service error' );
	}
	//
}
// ===========================================================================