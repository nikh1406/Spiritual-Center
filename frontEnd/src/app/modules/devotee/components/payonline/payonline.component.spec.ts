import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { PayonlineComponent } from './payonline.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { DebugElement, isDevMode } from '@angular/core';
import { By, provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideToastr } from 'ngx-toastr';
import { routes } from '../../../../app.routes';
import { appReducer } from '../../../../States/app.state';
import { LoginEffects } from '../../../../States/LoginState/login.effects';
import { CustomSerializer } from '../../../../States/RoutersState/custom-serializer';
import { UserListEffects } from '../../../States/DevoteeList/userlist.effects';
import { PaymentsEffects } from '../../../States/payment/payments.effects';

describe('PayonlineComponent', () => {
  let component: PayonlineComponent;
  let fixture: ComponentFixture<PayonlineComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayonlineComponent],
      providers: [provideRouter(routes), provideHttpClient(withFetch()), provideToastr({
        timeOut: 500,
        positionClass: 'toast-bottom-center',
        preventDuplicates: true,
      }),
      provideAnimationsAsync('noop'),
      provideAnimations(),

      provideStore(appReducer),
      provideEffects([UserListEffects, LoginEffects, PaymentsEffects]),
      provideRouterStore(
        {
          serializer: CustomSerializer
        }
      ),
      provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }), provideClientHydration()]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PayonlineComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with valid controls', () => {
    const form = component.valueForm;
    expect(form.get('month')).toBeTruthy();
    expect(form.get('year')).toBeTruthy();
    expect(form.get('amount')).toBeTruthy();
  });

  it('should show error messages for Amount should not be less than 100', () => {
    component.amountController.setValue(50);
    component.amountController.markAsTouched();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('#amountErr')).nativeElement.textContent).toContain('Amount should not be less than 100');
  });

  it('should display error messages for invalid inputs', fakeAsync(() => {
    component.valueForm.reset();
    component.valueForm.markAllAsTouched();
    tick(); 
    fixture.detectChanges(); 

    expect(fixture.debugElement.query(By.css('#monthErr')).nativeElement.textContent).toContain('Month is required');
    expect(fixture.debugElement.query(By.css('#yearErr')).nativeElement.textContent).toContain('Year is required');
    expect(fixture.debugElement.query(By.css('#amountErr')).nativeElement.textContent).toContain('Amount is required');
  }));

  it('should call paymentDetail() on button click with valid data', () => {
    spyOn(component, 'paymentDetail');

    const monthSelect = fixture.debugElement.query(By.css('#month'));
    monthSelect.nativeElement.value = '1';
    monthSelect.triggerEventHandler('change', null);

    const yearSelect = fixture.debugElement.query(By.css('#year'));
    yearSelect.nativeElement.value = '2023';
    yearSelect.triggerEventHandler('change', null);

    const amountInput = fixture.debugElement.query(By.css('#amount'));
    amountInput.nativeElement.value = '150';
    amountInput.triggerEventHandler('input', null);

    const submitButton = fixture.debugElement.query(By.css('#submit'));
    submitButton.triggerEventHandler('click', null);

    expect(component.paymentDetail).toHaveBeenCalled();
  });
});
