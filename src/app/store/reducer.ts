
import { Action, createReducer, on } from '@ngrx/store';
import { CreditCard } from '../models/credit-card-model';
import * as creditCardPaymentActions from './actions';

export const featureKey = 'creditCard';
export const currentDate = new Date();

export const initialCreditCardState: CreditCard[]
=[{
  creditCardNumber: '',
  cardHolder: '',
  expirationDate: currentDate,
  securityCode: '',
  amount: 0,
}]

export interface PaymentState {
  //isLoading?: boolean;
  error?: any;
  creditCardDetails?: Array<CreditCard>;
}


export const initializeState = ():
PaymentState => {
  return {
   // isLoading: false,
  error: null,
  creditCardDetails: Array<CreditCard>(),//initialCreditCardState
  };
}
export const initialState:
 PaymentState = {
  //isLoading: false,
  error: null,
  creditCardDetails: initialCreditCardState
};


const featureReducer = createReducer(
  initialState,
  on(creditCardPaymentActions.load, state => ({
    ...state,
    error: null
  })),
  on(creditCardPaymentActions.getCreditCard, state => state),

  on(creditCardPaymentActions.loadSuccess, (state, { creditCardData }) => {
    return  {
      ...state,
      creditCardData,
      isLoading: false,
      error: null
    };
  }),
  on(creditCardPaymentActions.creditCardPayment,
     (state: PaymentState, creditcard: CreditCard) => {
     return {...state, creditCardDetails: [...state.creditCardDetails, creditcard],
    error: null};}
     ),

  on(creditCardPaymentActions.SuccessGetCreditCardAction,
    (state:PaymentState, { payload }) =>{
      return {...state, creditCardDetails:payload};
    }
    ),
  on(creditCardPaymentActions.creditCardPaymentSuccess, (state, { creditCardData }) => ({
    ...state,
    creditCardData,
    isLoading: false,
    error: null
  })),

);


export function reducer(state: PaymentState, action: Action) {
  return featureReducer(state, action);
}
// const featureReducer = createReducer(
//   initialState,
//   on(CreditCardActions.GetCreditCardAction, state => state),
//   on(CreditCardActions.CreateCreditCardAction, (state: CreditCardState, creditcard: CreditCard) => {
//     return { ...state, CreditCards: [...state.CreditCards, creditcard], CreditCardError: null};
//   }),
//   on(CreditCardActions.SuccessGetCreditCardAction, (state: CreditCardState, {payload}) => {
//     return { ...state, CreditCards: payload };
//   }),
//   on(CreditCardActions.SuccessCreateCreditCardAction, (state: CreditCardState, {payload}) => {
//     return { ...state, CreditCards: payload};
//   }),
//   on(CreditCardActions.ErrorCreditCardAction, (state: CreditCardState, error: Error) => {
//     console.log(error);
//     return { ...state, CreditCardError: error};
//   })
// );
// export function reducer(state: PaymentState | undefined, action: Action) {
//   return reducer(state, action);
// }
