import { get } from 'lodash';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  concatMap,
  map,
  switchMap,
  mergeMap,
  filter,
  withLatestFrom,
} from 'rxjs/operators';

import { PaymentService } from './../service/payment.service';
import {
  load,
  loadSuccess,
  creditCardPayment,
  creditCardPaymentSuccess,
  creditCardPaymentError,
  getCreditCard,
  beginCreditCardPayment,
  BeginGetCreditCardAction,
  SuccessGetCreditCardAction
} from './actions';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CreditCard } from '../models/credit-card-model';

@Injectable()
export class CreditCardPaymentStoreEffects {
  constructor(
    private paymentService: PaymentService,
    private toasterService: ToastrService,
    private router: Router,
    private actions$: Actions
  ) {}

  proceedPayment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(beginCreditCardPayment),
      concatMap((action) => {
        return of(action).pipe(withLatestFrom());
      }),
      mergeMap(([action]) => {
        const { model } = action;

        let returnedAction;
        return this.paymentService.makePayment(action.payload).pipe(
          map((response) => {
            if (response.status === 200) {
              this.toasterService.success(
                'SUCCESS',
                'Your payment was successful'
              );
              returnedAction = creditCardPaymentSuccess({creditCardData: response.body.data});
              this.router.navigate([''])
            } else {
              this.toasterService.error(
                'FAILURE',
                'Your payment Failed please try again later'
              );
              returnedAction = creditCardPaymentError({
                error: 'Something went wrong please try again',
              });
            }
            return returnedAction;
          }),
          catchError((error) => of(creditCardPaymentError({ error })))
        );
      })
    )
  );
  getCreditCard$ = createEffect(() =>
  this.actions$.pipe(
    ofType(BeginGetCreditCardAction),
    mergeMap(action => {

      let returnedAction;
      let data: CreditCard[];
      return this.paymentService.getCreditCards().pipe(
        map((response) => {
          if (response.status === 200) {
            data = response.body;
            returnedAction = SuccessGetCreditCardAction({payload: data});
            console.log('effect', returnedAction);
            return returnedAction;
          } else {

            returnedAction = creditCardPaymentError({
              error: 'Card details not available',
            });
            return returnedAction;
          }

        }),
        catchError((error) => of(creditCardPaymentError({ error })))
      );
    })
  )
  );
}
