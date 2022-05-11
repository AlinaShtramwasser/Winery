// ===========================================================================
// File: winery.service.ts
// Service for Winery class
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
//
import { Observable, of, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';

import { IWinery, Winery } from './winery';

//https://www.techiediaries.com/angular-by-example-httpclient-get/
//https://www.concretepage.com/angular-2/angular-httpclient-get-example
@Injectable( { providedIn: 'root' } )
export class WineryService {
	/*
	** --------------------------------------------------------------------
	** Data declaration.
	*/
	baseUrl: string;
	codeName: string;
	// mockDatum: IWinery[] = [
	// 	new Winery( 1, 'Spring Mountain', '2805 Spring Mountain Rd, St. Helena', 'http://www.springmountainvineyard.com/', '205-333-0303', 'spring@email.com', 'springmountain', 5 ),
	// 	new Winery( 2, 'Venge', '4708 Silverado Trail N, Calistoga', 'https://www.vengevineyards.com/', '205-777-0303', 'venge@email.com', 'venge', 5 ),
	// 	new Winery( 3, 'Von Strasser', '965 Silverado Trail N, Calistoga', 'https://www.vonstrasser.com/', '205-793-5555', 'von@strasser.com', 'vonstrasser', 3 ),
	// 	new Winery( 4, 'Iron Horse', ' 9786 Ross Station Rd, Sebastopol', 'https://www.ironhorsevineyards.com/', '205-123-2255', 'iron@horse.com','ironhorse', 2 ),
	// 	new Winery( 5, 'Pride', '3000 Summit Trail, Santa Rosa', 'https://www.pridewines.com/', '205-555-5555', 'pride@email.com','pride', 5 ),
	// 	new Winery( 6, 'Behrens Family', '4078 Spring Mountain Rd, St Helena', 'https://behrensfamilywinery.com/', '205-666-6666', 'behrens@mail.com','behrens', 3 )
	// ];
	/*
	** Service constructor, inject http service.
	*/
	constructor(protected httpClient: HttpClient ) {
			this.codeName = 'winery.service';
			this.baseUrl ="http://localhost:12895/api/winery/";
	}
	/*
	** Read (get) all Winery.
	*/
	getWineries( ): Observable<any>  {
		return this.httpClient.get(this.baseUrl);
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