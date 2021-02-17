import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CreditCard } from '../models/credit-card-model';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {
   creditcards = JSON.parse(localStorage.getItem('creditcards')) || [];
  constructor(private httpClient: HttpClient) { }

  makePayment(model: any) :Observable<any> {
    this.creditcards= Object.assign([], this.creditcards);
    this.creditcards.push(model);
    localStorage.setItem('creditcards', JSON.stringify(this.creditcards));
    let response = {
      status: 'success',
      message: 'Successful',
      data: this.creditcards
    };
    return of(new HttpResponse({status: 200, body: response}));
  }

  getCreditCards() {
    let data: CreditCard[];
    data = this.creditcards;
    let response = {
      status: 'success',
      message: 'Successful',
      data: data
    };
    return of(new HttpResponse({status: 200, body: data}));
  }
}
