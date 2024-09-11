import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
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
import { routes } from '../../app.routes';
import { UserListEffects } from '../../modules/States/DevoteeList/userlist.effects';
import { PaymentsEffects } from '../../modules/States/payment/payments.effects';
import { appReducer } from '../../States/app.state';
import { LoginEffects } from '../../States/LoginState/login.effects';
import { CustomSerializer } from '../../States/RoutersState/custom-serializer';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
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

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  // Test for Role Validation
  it('should display "Role is required" error when role is empty', () => {
    // Trigger validation manually
    component.loginForm.get('role')?.markAsTouched();
    component.loginForm.get('role')?.markAsDirty();
    fixture.detectChanges();

    const errorElement = fixture.debugElement.nativeElement.querySelector('#roleErr');
    expect(errorElement.textContent).toContain('Role is required');
  });

  // Test for Username Validation
  it('should display "Username is required" error when username is empty', () => {
    // Trigger validation manually
    component.loginForm.get('username')?.markAsTouched();
    component.loginForm.get('username')?.markAsDirty();
    fixture.detectChanges();

    const errorElement = fixture.debugElement.nativeElement.querySelector('#usernameErr');
    expect(errorElement.textContent).toContain('Username is required');
  });

  // Test for Password Validation
  it('should display "Password is required" error when password is empty', () => {
    // Trigger validation manually
    component.loginForm.get('password')?.markAsTouched();
    component.loginForm.get('password')?.markAsDirty();
    fixture.detectChanges();

    const errorElement = fixture.debugElement.nativeElement.querySelector('#passwordErr');
    expect(errorElement.textContent).toContain('Password is required');
  });

  // Test for OTP Validation (Devotee role)
  it('should display "OTP is required" error when OTP is empty for Devotee role', () => {
    // Set role to Devotee and activate OTP view
    component.loginForm.get('role')?.setValue('Devotee');
    component.otpView = true;
    fixture.detectChanges();

    // Trigger validation manually
    component.loginForm.get('otp')?.markAsTouched();
    component.loginForm.get('otp')?.markAsDirty();
    fixture.detectChanges();

    const errorElement = fixture.debugElement.nativeElement.querySelector('#otpErr');
    expect(errorElement.textContent).toContain('OTP is required');
  });

  // Test for Invalid Credential Error
  it('should display "Invalid user/password/role" error when credentials are invalid', () => {
    // Set isvalidCredential to false to trigger the error
    component.isvalidCredential = false;
    fixture.detectChanges();

    const errorElement = fixture.debugElement.nativeElement.querySelector('#authInfo');
    expect(errorElement.textContent).toContain('Invalid user/password/role');
  });
});
