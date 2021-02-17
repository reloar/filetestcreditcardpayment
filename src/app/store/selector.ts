import { createSelector } from '@ngrx/store';

import { featureKey, PaymentState } from "./reducer";
import { CreditCard } from '../models/credit-card-model';

export const selectCreditCardState
= (state): PaymentState => state;
const getPaymentState =
createSelector(selectCreditCardState, state => state);

const getCreditCardState = createSelector
(selectCreditCardState, state => state.creditCardDetails);

export const CreditCardQuery = {
  selectCreditCardState,
  getCreditCardState,
  getPaymentState
};

