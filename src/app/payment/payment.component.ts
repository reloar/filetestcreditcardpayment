import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { PaymentState } from '../store/reducer';

import * as CreditCardActions from '../store/actions';
import { CreditCard } from '../models/credit-card-model';
//import { CreditCardPaymentState } from '../store/state';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  unsubscribe$ = new Subject();
  paymentForm: FormGroup;
  errorMessage: string;
  currentDate = new Date();
  currentMonth = this.currentDate.getMonth() + 1;
  currentYear = this.currentDate.getFullYear();

  constructor(private formBuilder: FormBuilder,
    private store: Store<{ creditcards: PaymentState }>) { }

  ngOnInit() {

    this.form();
    console.log('year', this.currentYear);
  }


  form() {
    this.paymentForm = this.formBuilder.group({
      amount: ['', [Validators.required,
        Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      cardHolder: ['',
        [Validators.required,
        Validators.minLength(1),
        Validators.pattern('^[A-Za-z][A-Za-z -]*$')]],
      cardNumber: ['', [
        Validators.required,
        Validators.minLength(16),]],
      expirationMonth: ['',
      [Validators.required,
        // Validators.minLength(1),
        // Validators.maxLength(2),
        // Validators.min(this.currentMonth),Validators.max(12)
      ]],
      expirationYear: ['',
      [Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
        Validators.min(this.currentYear),
        Validators.max(9999)]],
      CCVNumber: ['',
      [Validators.required,]]
    });
  }

 get formControls() { return this.paymentForm.controls; }

 onSubmit() {
   this.submitForm();
  }

  submitForm() {

    const expiryDate = new Date
    (this.paymentForm.get('expirationYear').value,
    this.paymentForm.get('expirationMonth').value, 1)
    const paymentFormData: CreditCard = {
      creditCardNumber: this.paymentForm.get('cardNumber').value.toString(),
      cardHolder: this.paymentForm.get('cardHolder').value,
      expirationDate: expiryDate,
      securityCode: this.paymentForm.get('CCVNumber').value,
      amount: +this.paymentForm.get('amount').value,
    };

    this.store.dispatch(CreditCardActions.beginCreditCardPayment({payload: paymentFormData}));

  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


}
