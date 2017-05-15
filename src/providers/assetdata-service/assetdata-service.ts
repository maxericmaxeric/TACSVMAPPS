import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import 'rxjs/add/operator/toPromise';

export class AccountType {
  account_type: string;
  balance_sum: number;
}

export class Asset {
  currency: string;
  balance_sum: number;
}

/*
  Generated class for the AssetdataServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AssetdataServiceProvider {

  private asset_url = "http://192.1.6.34:8080/deposit/getBalanceOfEachCurrency";
  private accType_url = "http://192.1.6.34:8080/deposit/getBalanceOfEachAccType";
  constructor(public http: Http) {
    console.log('Hello AssetdataServiceProvider Provider');
  }

  getAssets(customer_code: string): Promise<Asset[]>{
    const url = `${this.asset_url}?customer_code=${customer_code}`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        console.log(response.json());
        let ret:Asset[] = (response.json() as Asset[]);
        console.log(JSON.stringify(ret));
        return ret;
      })
      .catch(this.handleError);
  }



  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getAccType(customer_code: string, currency: string) {
    const url = `${this.accType_url}?customer_code=${customer_code}&currency=${currency}`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        console.log(response.json());
        let ret:AccountType[] = (response.json() as AccountType[]);
        console.log(JSON.stringify(ret));
        return ret;
      })
      .catch(this.handleError);
  }
}
