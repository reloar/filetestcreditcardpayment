import {createAction, props} from '@ngrx/store';
import { CreditCard } from '../models/credit-card-model';

export enum CreditCardPaymentActionType {
  LOAD_CREDIT_CARD = '[CreditCardPayment] Load',
  LOAD_CREDIT_CARD_SUCCESS = '[CreditCardPayment] Load Success',
  REFRESH = '[CreditCardPayment] Refresh',
  CREDIT_CARD_PAYMENT= '[CreditCardPayment] Pay',
  CREDIT_CARD_PAYMENT_SUCCESS = '[CreditCardPayment] Payment Success',
  CREDIT_CARD_PAYMENT_ERROR = '[CreditCardPayment] Submit Success',
  GET_CREDIT_CARD= '[GetCreditCard] Retrieve Card',
  BEGIN_CREDIT_CARD= '[CreditCard] - Begin Get CreditCard',
 BEGIN_CREDIT_CARD_PAYMENT= '[CreditCard] - Begin Create CreditCard',
 SUCCESS_GET_CARD='[CreditCard] - Success Get CreditCard'
}

export const load = createAction
(
  CreditCardPaymentActionType.LOAD_CREDIT_CARD
  );

export const loadSuccess = createAction(
  CreditCardPaymentActionType.LOAD_CREDIT_CARD_SUCCESS,
  props<{ creditCardData: CreditCard }>()
);

export const creditCardPayment = createAction(
  CreditCardPaymentActionType.CREDIT_CARD_PAYMENT,
  props<CreditCard>()
);

export const creditCardPaymentSuccess = createAction(
  CreditCardPaymentActionType.CREDIT_CARD_PAYMENT_SUCCESS,
  props<{ creditCardData: CreditCard }>()
);

export const beginCreditCardPayment = createAction(
  CreditCardPaymentActionType.BEGIN_CREDIT_CARD_PAYMENT,
   props<{ payload: CreditCard }>()
 );
export const creditCardPaymentError = createAction(
  CreditCardPaymentActionType.CREDIT_CARD_PAYMENT_SUCCESS,
  props<{ error: string }>()
);

export const getCreditCard = createAction(
  CreditCardPaymentActionType.GET_CREDIT_CARD,
);

export const BeginGetCreditCardAction = createAction(
CreditCardPaymentActionType.BEGIN_CREDIT_CARD
);

export const SuccessGetCreditCardAction = createAction(
  CreditCardPaymentActionType.SUCCESS_GET_CARD,
props<{ payload: CreditCard[] }>()
);


export const refresh = createAction(CreditCardPaymentActionType.REFRESH);
