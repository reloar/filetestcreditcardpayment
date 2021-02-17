import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PaymentComponent } from './payment/payment.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/reducer';
import { EffectsModule } from '@ngrx/effects';
import { CreditCardPaymentStoreEffects } from './store/effects';
import { PaymentService } from './service/payment.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
   BrowserAnimationsModule,
   FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot({creditcards: reducer}),

    EffectsModule.forRoot([CreditCardPaymentStoreEffects]),

  ],
  providers: [
    PaymentService,
    // CreditCardPaymentState
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
