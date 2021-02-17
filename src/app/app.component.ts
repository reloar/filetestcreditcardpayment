import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { CreditCard } from './models/credit-card-model';
import { PaymentState } from './store/reducer';

import * as CreditCardActions from './store/actions';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  creditCard$: Observable<PaymentState>;
  title = 'creditcardpaymentdetails';

  CreditCardSubscription: Subscription | undefined;
  CreditCardList: CreditCard;
  creditcardError: Error = null;
  constructor(private router: Router,
    private store: Store<{ creditcards: PaymentState }>
   ) {
    this.creditCard$ = store.pipe(select('creditcards'));
   }
   ngOnInit(): void {

  }
  navigate(){
    this.router.navigate(['/make-payment']);
  }
}
