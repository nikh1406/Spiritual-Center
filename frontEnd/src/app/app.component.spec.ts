import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { isDevMode } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { UserListEffects } from './modules/States/DevoteeList/userlist.effects';
import { PaymentsEffects } from './modules/States/payment/payments.effects';
import { appReducer } from './States/app.state';
import { LoginEffects } from './States/LoginState/login.effects';
import { CustomSerializer } from './States/RoutersState/custom-serializer';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter(routes), provideHttpClient(withFetch()), provideToastr({
        timeOut: 500,
        positionClass: 'toast-bottom-center',
        preventDuplicates: true,
      }), 
      provideAnimationsAsync('noop'), 
      provideAnimations(), 
    
      provideStore(appReducer), 
      provideEffects([UserListEffects,LoginEffects,PaymentsEffects]), 
      provideRouterStore(
        {
          serializer: CustomSerializer
        }
      ), 
      provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }), provideClientHydration()]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });


 
});
