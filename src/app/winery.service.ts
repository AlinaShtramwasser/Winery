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
		new Winery( 1, 'Spring Mountain', '2805 Spring Mountain Rd, St. Helena', 'http://www.springmountainvineyard.com/', 'phone1', 'spring@email.com', 'springmountain', 5 ),
		new Winery( 2, 'Venge', '4708 Silverado Trail N, Calistoga', 'https://www.vengevineyards.com/', 'phone2', 'venge@email.com', 'venge', 5 ),
		new Winery( 3, 'Von Strasser', '965 Silverado Trail N, Calistoga', 'https://www.vonstrasser.com/', 'phone3', 'von@strasser.com', 'vonstrasser', 3 ),
		new Winery( 4, 'Iron Horse', ' 9786 Ross Station Rd, Sebastopol', 'https://www.ironhorsevineyards.com/', 'phone4', 'iron@horse.com','ironhorse', 2 ),
		new Winery( 5, 'Pride', '3000 Summit Trail, Santa Rosa', 'https://www.pridewines.com/', 'phone5', 'pride@email.com','pride', 5 ),
		new Winery( 6, 'Behrens Family', '4078 Spring Mountain Rd, St Helena', 'https://behrensfamilywinery.com/', 'phone6', 'behrens@mail.com','behrens', 3 )
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