/*
** ===========================================================================
** File: winery.ts
** Author: Alina Shtramwasser
** Created Date: Thu May 28, 2021
** ---------------------------------------------------------------------------
**
** define the interface IWinery and class Winery
*/
export interface IWinery {
	Id: number;
	Name: string;
	Address: string;
	Url: string;
	Rating?: number;
	Phone: string;
	Email: string;
	ImageTitle: string;
	toString(): string;
}

export class Winery implements IWinery {
	/*
	** Single place to create a new Winery.
	*/
	public static empty( ): IWinery {
		return new Winery( 0, '', '', '', '','', '', 0);
	}
	/*
	** using short-hand declaration...
	*/
	constructor(
		public Id: number,
		public Name: string,
		public Address: string,
		public Url: string,
		public Phone: string,
		public Email: string,
		public ImageTitle: string,
		public Rating: number
	) { }
	/*
	** toString implementation for class Winery
	*/
	public toString = (): string => {
		return JSON.stringify( this );
	}

}
// ===========================================================================