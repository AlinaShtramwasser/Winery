/*
** ===========================================================================
** File: winery.ts
** Author: Phil Huhn
** Created Date: Thu May 27 2021
** ---------------------------------------------------------------------------
**
** define the interface IWinery and class Winery
*/
export interface IWinery {
	Id: number;
	Name: string;
	Address: string;
	Url: string;
	//
	toString(): string;
	//
}
//
export class Winery implements IWinery {
	/*
	** Single place to create a new Winery.
	*/
	public static empty( ): IWinery {
		return new Winery( 0, '', '', '' );
	}
	/*
	** using short-hand declaration...
	*/
	constructor(
		public Id: number,
		public Name: string,
		public Address: string,
		public Url: string
	) { }
	/*
	** toString implementation for class Winery
	*/
	public toString = (): string => {
		return JSON.stringify( this );
	}
	//
}
// ===========================================================================