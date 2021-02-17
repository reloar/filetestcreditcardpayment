import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreditCard } from '../models/credit-card-model';
import * as CreditCardActions from '../store/actions';
import { PaymentState } from '../store/reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  creditCard$: Observable<PaymentState>;
  title = 'creditcardpaymentdetails';

  CreditCardSubscription: Subscription | undefined;
  CreditCardList: CreditCard[]=[];
  creditcardError: Error = null;
  constructor(private router: Router,
    private store: Store<{ creditcards: PaymentState }>
   ) {
    this.creditCard$ = store.pipe(select('creditcards'));
   }

  ngOnInit(): void {
    this.CreditCardSubscription = this.creditCard$
      .pipe(
        map(x => {

          this.CreditCardList = x.creditCardDetails;
          this.creditcardError = x.error;
        })
      )
      .subscribe();

let item=   this.store.dispatch(
      CreditCardActions.BeginGetCreditCardAction()
      );

console.log('x', this.CreditCardList);
  }
  //this.creditCardPaymentState.getCreditCardData();
  navigate(){
    this.router.navigate(['/make-payment']);
  }
}
