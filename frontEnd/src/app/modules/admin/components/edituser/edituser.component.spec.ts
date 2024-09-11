import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdituserComponent } from './edituser.component';
import { provideStore } from '@ngrx/store';
import { appReducer } from '../../../../States/app.state';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { DebugElement, isDevMode } from '@angular/core';
import { By, provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideToastr } from 'ngx-toastr';
import { routes } from '../../../../app.routes';
import { LoginEffects } from '../../../../States/LoginState/login.effects';
import { CustomSerializer } from '../../../../States/RoutersState/custom-serializer';
import { UserListEffects } from '../../../States/DevoteeList/userlist.effects';
import { PaymentsEffects } from '../../../States/payment/payments.effects';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('EdituserComponent', () => {
  let component: EdituserComponent;
  let fixture: ComponentFixture<EdituserComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [EdituserComponent,ReactiveFormsModule,CommonModule,FormsModule],
      providers: [provideRouter(routes), provideHttpClient(withFetch()), provideToastr({
        timeOut: 500,
        positionClass: 'toast-bottom-center',
        preventDuplicates: true,
      }),
      provideClientHydration(),
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

    fixture = TestBed.createComponent(EdituserComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });
  
  afterEach(() => {
    fixture.destroy();
    TestBed.resetTestingModule();
  });

  beforeAll(async () => {
    if (!sessionStorage.getItem("EditUserData")) {
      const mockData = {
        firstName: 'John',
        middleName: 'Doe',
        lastName: 'Smith',
        emailid: 'john.doe@example.com',
        initiationDate: '2024-06-30',
        flatNumber: 123,
        area: 'XYZ',
        city: 'New York',
        state: 'NY',
        pincode: '10001',
        photo: "img",
      };
      sessionStorage.setItem("EditUserData", JSON.stringify(mockData));
    }
    else{

    }
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  // it('should show error message for invalid email format', () => {
  //   component.createuserForm.controls['emailid'].setValue('invalid-email');
  //   component.createuserForm.controls['emailid'].markAsTouched();
  //   fixture.detectChanges();

  //   expect(debugElement.query(By.css('#emailIdErr')).nativeElement.textContent).toContain(
  //     'Pleae enter valid email'
  //   );
  // });

  // it('should validate First Name', () => {
  //   component.firstnameController.setValue('');
  //   expect(component.firstnameController.hasError('required')).toBeTrue();

  //   component.firstnameController.setValue('ab');
  //   expect(component.firstnameController.hasError('minlength')).toBeTrue();

  //   component.firstnameController.setValue('abcdefghijklmnopqrst');
  //   expect(component.firstnameController.hasError('maxlength')).toBeTrue();

  //   component.firstnameController.setValue('John');
  //   expect(component.firstnameController.hasError('required')).toBeFalse();
  //   expect(component.firstnameController.hasError('minlength')).toBeFalse();
  //   expect(component.firstnameController.hasError('maxlength')).toBeFalse();
  // });

  // it('should validate Middle Name', () => {
  //   component.middleNameController.setValue('');
  //   expect(component.middleNameController.hasError('required')).toBeTrue();

  //   component.middleNameController.setValue('ab');
  //   expect(component.middleNameController.hasError('minlength')).toBeTrue();

  //   component.middleNameController.setValue('abcdefghijklmnopqrst');
  //   expect(component.middleNameController.hasError('maxlength')).toBeTrue();

  //   component.middleNameController.setValue('Doe');
  //   expect(component.middleNameController.hasError('required')).toBeFalse();
  //   expect(component.middleNameController.hasError('minlength')).toBeFalse();
  //   expect(component.middleNameController.hasError('maxlength')).toBeFalse();
  // });

  // it('should validate Last Name', () => {
  //   component.lastNameController.setValue('');
  //   expect(component.lastNameController.hasError('required')).toBeTrue();

  //   component.lastNameController.setValue('ab');
  //   expect(component.lastNameController.hasError('minlength')).toBeTrue();

  //   component.lastNameController.setValue('abcdefghijklmnopqrst');
  //   expect(component.lastNameController.hasError('maxlength')).toBeTrue();

  //   component.lastNameController.setValue('Smith');
  //   expect(component.lastNameController.hasError('required')).toBeFalse();
  //   expect(component.lastNameController.hasError('minlength')).toBeFalse();
  //   expect(component.lastNameController.hasError('maxlength')).toBeFalse();
  // });

  it('should validate Flat Number', () => {
    component.flatNumberController.setValue('');
    expect(component.flatNumberController.hasError('required')).toBeTrue();

    component.flatNumberController.setValue('123');
    expect(component.flatNumberController.hasError('required')).toBeFalse();
  });

  it('should validate Area', () => {
    component.areaController.setValue('');
    expect(component.areaController.hasError('required')).toBeTrue();

    component.areaController.setValue('Downtown');
    expect(component.areaController.hasError('required')).toBeFalse();
  });

  it('should validate City', () => {
    component.cityController.setValue('');
    expect(component.cityController.hasError('required')).toBeTrue();

    component.cityController.setValue('New York');
    expect(component.cityController.hasError('required')).toBeFalse();
  });

  it('should validate State', () => {
    component.stateController.setValue('');
    expect(component.stateController.hasError('required')).toBeTrue();

    component.stateController.setValue('New York');
    expect(component.stateController.hasError('required')).toBeFalse();
  });

  // it('should validate Pincode', () => {
  //   component.pincodeeController.setValue('');
  //   expect(component.pincodeeController.hasError('required')).toBeTrue();

  //   component.pincodeeController.setValue('123456');
  //   expect(component.pincodeeController.hasError('required')).toBeFalse();
  //   expect(component.pincodeeController.hasError('invalidPincode')).toBeFalse();

  //   component.pincodeeController.setValue('1234567');
  //   expect(component.pincodeeController.hasError('maxlength')).toBeTrue();

  //   component.pincodeeController.setValue('12345A');
  //   expect(component.pincodeeController.hasError('invalidPincode')).toBeTrue();
  // });


  it('should submit the form with valid data', () => {
    component.createuserForm.setValue(component.createuserForm.value);

    const submitButton = debugElement.query(By.css('#submit'));
    fixture.detectChanges();
    submitButton.triggerEventHandler('click', null);

    expect(component.createuserForm.valid).toBe(true);

  });

  it('should show error messages for required fields', () => {

    component.createuserForm.reset();
    component.createuserForm.markAllAsTouched();
    fixture.detectChanges();
    expect(debugElement.query(By.css('#firstNameErr')).nativeElement.textContent).toContain('First Name is required');
    expect(debugElement.query(By.css('#middleNameErr')).nativeElement.textContent).toContain('Middle Name is required');
    expect(debugElement.query(By.css('#lastNameErr')).nativeElement.textContent).toContain('Last Name is required');
    expect(debugElement.query(By.css('#emailIdErr')).nativeElement.textContent).toContain('Email is required');
    expect(debugElement.query(By.css('#flatNumberErr')).nativeElement.textContent).toContain('Flat Number is required');
    expect(debugElement.query(By.css('#areaErr')).nativeElement.textContent).toContain('Area is required');
    expect(debugElement.query(By.css('#cityErr')).nativeElement.textContent).toContain('City is required');
    expect(debugElement.query(By.css('#stateErr')).nativeElement.textContent).toContain('State is required');
    expect(debugElement.query(By.css('#pinCodeErr')).nativeElement.textContent).toContain('Pincode is required');
    expect(debugElement.query(By.css('#initiationDateErr')).nativeElement.textContent).toContain('Initiation Date is required');
  });

  it('should show error message for invalid email format', () => {
    component.createuserForm.controls['emailid'].setValue('john.doe');
    component.createuserForm.controls['emailid'].markAsTouched();
    fixture.detectChanges();

    expect(debugElement.query(By.css('#emailIdErr')).nativeElement.textContent).toContain(
      'Pleae enter valid email'
    );
    
  });

  

  it('should show error messages for minimum length validation', () => {
    component.createuserForm.controls['firstName'].setValue('Jo');
    component.createuserForm.controls['firstName'].markAsTouched();
    fixture.detectChanges();

    expect(debugElement.query(By.css('#firstNameErr')).nativeElement.textContent).toContain(
      'For First Name minimum 3 char required'
    );

    component.createuserForm.controls['middleName'].setValue('Do');
    component.createuserForm.controls['middleName'].markAsTouched();
    fixture.detectChanges();

    expect(debugElement.query(By.css('#middleNameErr')).nativeElement.textContent).toContain(
      'For Middle Name minimum 3 char required'
    );

    component.createuserForm.controls['lastName'].setValue('Sm');
    component.createuserForm.controls['lastName'].markAsTouched();
    fixture.detectChanges();

    expect(debugElement.query(By.css('#lastNameErr')).nativeElement.textContent).toContain(
      'For Last Name minimum 3 char required'
    );
  });

  it('should show error messages for maximum length validation', () => {
    component.createuserForm.controls['firstName'].setValue(
      'TooLongFirstName1234567890'
    );
    component.createuserForm.controls['firstName'].markAsTouched();
    fixture.detectChanges();

    expect(debugElement.query(By.css('#firstNameErr')).nativeElement.textContent).toContain(
      'For First Name maximum 15 char allowed'
    );

    component.createuserForm.controls['middleName'].setValue(
      'TooLongMiddleName1234567890'
    );
    component.createuserForm.controls['middleName'].markAsTouched();
    fixture.detectChanges();

    expect(debugElement.query(By.css('#middleNameErr')).nativeElement.textContent).toContain(
      'For Middle Name maximum 15 char allowed'
    );

    component.createuserForm.controls['lastName'].setValue(
      'TooLongLastName1234567890'
    );
    component.createuserForm.controls['lastName'].markAsTouched();
    fixture.detectChanges();

    expect(debugElement.query(By.css('#lastNameErr')).nativeElement.textContent).toContain(
      'For Last Name maximum 15 char allowed'
    );
  });

  it('should show error message for invalid pincode format', () => {
    component.createuserForm.controls['pincode'].setValue('10001A');
    component.createuserForm.controls['pincode'].markAsTouched();
    fixture.detectChanges();

    expect(debugElement.query(By.css('#pinCodeErr')).nativeElement.textContent).toContain(
      'Pincode should not contain non digit characters'
    );
  });

  it('should show error message for pincode exceeding maximum length', () => {
    component.createuserForm.controls['pincode'].setValue('1234567');
    component.createuserForm.controls['pincode'].markAsTouched();
    fixture.detectChanges();

    expect(debugElement.query(By.css('#pinCodeErr')).nativeElement.textContent).toContain(
      'For Pincode maximum 6 digit allowed'
    );
  });

  


});
