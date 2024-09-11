import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationsComponent } from './donations.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { isDevMode } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideStore, Store } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideToastr } from 'ngx-toastr';
import { routes } from '../../../../app.routes';
import { appReducer, AppState } from '../../../../States/app.state';
import { LoginEffects } from '../../../../States/LoginState/login.effects';
import { CustomSerializer } from '../../../../States/RoutersState/custom-serializer';
import { UserListEffects } from '../../../States/DevoteeList/userlist.effects';
import { PaymentsEffects } from '../../../States/payment/payments.effects';
import { BackendDataService } from '../../../../Services/backend-data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { loadpayment } from '../../../States/payment/payment.action';
import { payment, userList } from '../../../../models/backend';
import { of } from 'rxjs';
import { unpaidUserAction } from '../../../States/DevoteeList/userlist.actions';
import { getPayments } from '../../../States/payment/payment.selector';
import { getUnpaidData } from '../../../States/DevoteeList/userlist.selector';

describe('DonationsComponent', () => {
  let component: DonationsComponent;
  let fixture: ComponentFixture<DonationsComponent>;
  let store: Store<AppState>;
  let backendDataService: BackendDataService;
  const initialState = {
    payment: {
      payments: [],
    },
    userlist: {
      unpaidUsers: [],
    },
  };

  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonationsComponent,FormsModule,ReactiveFormsModule,NgxPaginationModule],
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
    
    fixture = TestBed.createComponent(DonationsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store<AppState>);
    backendDataService = TestBed.inject(BackendDataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should dispatch loadpayment action on init', () => {
    const loadPaymentSpy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(loadPaymentSpy).toHaveBeenCalledWith(loadpayment());
  });

  it('should subscribe to getPayments selector and update userPaymentList', () => {
    const mockPayments: payment[] = [
      { devoteeId: "2024-Fb-Gb-7", month: 7 , year: 2023, amount: 10000 ,paymentMethod:"online"},
    ];
    const getPaymentsSpy = spyOn(store, 'select').and.returnValue(of(mockPayments));
    component.ngOnInit();

    expect(getPaymentsSpy).toHaveBeenCalled()
    expect(component.userPaymentList).toEqual(mockPayments);
  });

  it('should dispatch unpaidUserAction when paymentCategory is "unpaid"', () => {
    const unpaidUserActionSpy = spyOn(store, 'dispatch');
    component.paymentCategoryController.setValue('unpaid');

    expect(unpaidUserActionSpy).toHaveBeenCalledWith(unpaidUserAction());
  });


  it('should render table for unpaid users when paymentCategory is "unpaid"', () => {
    const mockUnpaidUsers: userList[] = [
      { devoteeId: "2024-ki-ka-7", firstName: 'John', lastName: 'Doe', emailid: 'john.doe@example.com' ,area:"cvdfg",city:"dsfds",flatNumber:41,initiationDate:"2024-07-03T00:00:00",pincode:"395006",middleName:"fhgf",state:"sgf"},
      { devoteeId: "2024-Ni-Sa-4", firstName: 'Jane', lastName: 'Doe', emailid: 'jane.doe@example.com' ,area:"cvdfg",city:"dsfds",flatNumber:41,initiationDate:"2024-07-03T00:00:00",pincode:"395006",middleName:"fhgf",state:"sgf"}
    ];
  
    const getUnpaidDataSpy = spyOn(store, 'select').and.returnValue(of(mockUnpaidUsers));
    component.paymentCategoryController.setValue('unpaid');
    component.ngOnInit();
    fixture.detectChanges();
  
    const tableElement = fixture.debugElement.nativeElement.querySelector('table');
    expect(tableElement).toBeTruthy();
    expect(tableElement.querySelectorAll('tr').length).toBe(4); // Expecting 4 rows: 2 header + 2 data rows
  });

  it('should render all payment list when paymentCategoryController value is allpayment', () => {
        const mockPaymentData: payment[] = [
          { devoteeId: "2024-Fb-Gb-7", month: 7 , year: 2023, amount: 10000 ,paymentMethod:"online"},
        ];
        spyOn(store, 'select').and.returnValue(of(mockPaymentData));
        component.ngOnInit();
        component.paymentCategoryController.setValue('allpayment');
        fixture.detectChanges(); 
        expect(fixture.nativeElement.querySelector('#allPaymentList')).toBeTruthy();
      });

  it('should render unpaid donation list when paymentCategoryController value is unpaid', () => {
    const mockUnpaidUserData: userList[] = [
{ devoteeId: "2024-ki-ka-7", firstName: 'John', lastName: 'Doe', emailid: 'john.doe@example.com' ,area:"cvdfg",city:"dsfds",flatNumber:41,initiationDate:new Date("23/07/2024"),pincode:"395006",middleName:"fhgf",state:"sgf"},
      { devoteeId: "2024-Ni-Sa-4", firstName: 'Jane', lastName: 'Doe', emailid: 'jane.doe@example.com' ,area:"cvdfg",city:"dsfds",flatNumber:41,initiationDate:new Date("23/07/2024"),pincode:"395006",middleName:"fhgf",state:"sgf"}
    ];
    spyOn(store, 'select').and.returnValue(of(mockUnpaidUserData));
    component.ngOnInit();
    component.paymentCategoryController.setValue('unpaid');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#allUnpaidList')).toBeTruthy();
  });
      
});

















  
  // it('should switch to unpaid donations list when dropdown selection changes', () => {
  //   // Mock the store response for unpaid users
  //   const mockUnpaidUserData: userList[] = [
  //     { devoteeId: "2024-ki-ka-7", firstName: 'John', lastName: 'Doe', emailid: 'john.doe@example.com' ,area:"cvdfg",city:"dsfds",flatNumber:41,initiationDate:"23-06-2024",pincode:"395006",middleName:"fhgf",state:"sgf"},
  //     { devoteeId: "2024-Ni-Sa-4", firstName: 'Jane', lastName: 'Doe', emailid: 'jane.doe@example.com' ,area:"cvdfg",city:"dsfds",flatNumber:41,initiationDate:"23-06-2024",pincode:"395006",middleName:"fhgf",state:"sgf"}
  //   ];
  //   spyOn(store, 'select').and.returnValue(of(mockUnpaidUserData));

  //   // Simulate dropdown selection change
  //   component.paymentCategoryController.setValue('unpaid');

  //   // Verify that the unpaid user list is populated
  //   expect(component.UserList).toEqual(mockUnpaidUserData);
  //   expect(store.dispatch).toHaveBeenCalledWith(unpaidUserAction());
  // });

  

  // it('should subscribe to paymentCategoryController value changes and dispatch unpaidUserAction', () => {
  //   const mockPaymentCategoryValue = 'unpaid';


  //   spyOn(store, 'dispatch');
  //   component.ngOnInit();

  //   // Assert that the subscription was set up
  //   expect(component.paymentCategoryController.value).toHaveBeenCalled();
  //   // Assert that the action was dispatched
  //   expect(store.dispatch).toHaveBeenCalledWith(unpaidUserAction());
  // });

  // it('should subscribe to unpaid user data from store when paymentCategory is unpaid', () => {
  //   const mockUnpaidUserData: userList[] = [
  //     // Mock unpaid user data
  //   ];
  //   const mockPaymentCategoryValue = 'unpaid';
  //   spyOn(component.paymentCategoryController, 'valueChanges').and.returnValue(of(mockPaymentCategoryValue));
  //   spyOn(store, 'select').and.returnValue(of(mockUnpaidUserData));
  //   component.ngOnInit();
  //   expect(component.UserList).toEqual(mockUnpaidUserData);
  // });


// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { DonationsComponent } from './donations.component';
// import { provideHttpClient, withFetch } from '@angular/common/http';
// import { isDevMode } from '@angular/core';
// import { provideClientHydration } from '@angular/platform-browser';
// import { provideAnimations } from '@angular/platform-browser/animations';
// import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// import { provideRouter } from '@angular/router';
// import { provideEffects } from '@ngrx/effects';
// import { provideRouterStore } from '@ngrx/router-store';
// import { provideStore, Store } from '@ngrx/store';
// import { provideStoreDevtools } from '@ngrx/store-devtools';
// import { provideToastr } from 'ngx-toastr';
// import { routes } from '../../../../app.routes';
// import { appReducer, AppState } from '../../../../States/app.state';
// import { LoginEffects } from '../../../../States/LoginState/login.effects';
// import { CustomSerializer } from '../../../../States/RoutersState/custom-serializer';
// import { UserListEffects } from '../../../States/DevoteeList/userlist.effects';
// import { PaymentsEffects } from '../../../States/payment/payments.effects';
// import { BackendDataService } from '../../../../Services/backend-data.service';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { NgxPaginationModule } from 'ngx-pagination';
// import { loadpayment } from '../../../States/payment/payment.action';
// import { payment, userList } from '../../../../models/backend';
// import { of } from 'rxjs';
// import { unpaidUserAction } from '../../../States/DevoteeList/userlist.actions';
// import { getPayments } from '../../../States/payment/payment.selector';
// import { getUnpaidData } from '../../../States/DevoteeList/userlist.selector';

// describe('DonationsComponent', () => {
//   let component: DonationsComponent;
//   let fixture: ComponentFixture<DonationsComponent>;
//   let store: Store<AppState>;
//   let backendDataService: BackendDataService;

//   const initialState = {
//     payment: {
//       payments: [],
//     },
//     unpaidUser: {
//       unpaidUsers: [],
//     },
//   };

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [DonationsComponent,FormsModule,ReactiveFormsModule,NgxPaginationModule],
//       providers: [provideRouter(routes), provideHttpClient(withFetch()), provideToastr({
//         timeOut: 500,
//         positionClass: 'toast-bottom-center',
//         preventDuplicates: true,
//       }),
//       provideClientHydration(),
//       provideAnimationsAsync('noop'),
//       provideAnimations(),

//       provideStore(appReducer, initialState),
//       provideEffects([UserListEffects, LoginEffects, PaymentsEffects]),
//       provideRouterStore(
//         {
//           serializer: CustomSerializer
//         }
//       ),
//       provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }), provideClientHydration()]
//     })
//     .compileComponents();
    
//     fixture = TestBed.createComponent(DonationsComponent);
//     component = fixture.componentInstance;
//     store = TestBed.inject(Store);
//     backendDataService = TestBed.inject(BackendDataService);
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should initialize paymentCategoryFrom with default value', () => {
//     expect(component.paymentCategoryFrom.get('paymentCategory')?.value).toBe('allpayment');
//   });

//   it('should dispatch loadpayment action on ngOnInit', () => {
//     spyOn(store, 'dispatch');
//     component.ngOnInit();
//     expect(store.dispatch).toHaveBeenCalledWith(loadpayment());
//   });

//   it('should subscribe to payment data from store', () => {
//     const mockPaymentData: payment[] = [
//       // Mock payment data
//     ];
//     spyOn(store, 'select').and.returnValue(of(mockPaymentData));
//     component.ngOnInit();
//     expect(component.userPaymentList).toEqual(mockPaymentData);
//   });

//   it('should subscribe to paymentCategoryController value changes', () => {
//     const mockPaymentCategoryValue = 'unpaid';
//     const mockUnpaidUserData: userList[] = [
//       // Mock unpaid user data
//     ];
//     spyOn(store, 'select').and.returnValue(of(mockUnpaidUserData));
//     spyOn(component.paymentCategoryController, 'valueChanges').and.returnValue(of(mockPaymentCategoryValue));
//     spyOn(store, 'dispatch');
//     component.ngOnInit();
//     expect(component.paymentCategoryController.valueChanges.subscribe).toHaveBeenCalled();
//     expect(store.dispatch).toHaveBeenCalledWith(unpaidUserAction());
//   });

//   it('should subscribe to unpaid user data from store when paymentCategory is unpaid', () => {
//     const mockUnpaidUserData: userList[] = [
//       // Mock unpaid user data
//     ];
//     const mockPaymentCategoryValue = 'unpaid';
//     spyOn(component.paymentCategoryController, 'valueChanges').and.returnValue(of(mockPaymentCategoryValue));
//     spyOn(store, 'select').and.returnValue(of(mockUnpaidUserData));
//     component.ngOnInit();
//     expect(component.UserList).toEqual(mockUnpaidUserData);
//   });

//   it('should set p to 1 when paymentCategoryController value changes', () => {
//     const mockPaymentCategoryValue = 'unpaid';
//     spyOn(component.paymentCategoryController, 'valueChanges').and.returnValue(of(mockPaymentCategoryValue));
//     component.ngOnInit();
//     expect(component.p).toBe(1); 
//   });

//   it('should render all payment list when paymentCategoryController value is allpayment', () => {
//     const mockPaymentData: payment[] = [
//       // Mock payment data
//     ];
//     spyOn(store, 'select').and.returnValue(of(mockPaymentData));
//     component.ngOnInit();
//     component.paymentCategoryController.setValue('allpayment');
//     fixture.detectChanges(); // Trigger change detection
//     expect(fixture.nativeElement.querySelector('#allPaymentList')).toBeTruthy();
//   });

//   it('should render unpaid donation list when paymentCategoryController value is unpaid', () => {
//     const mockUnpaidUserData: userList[] = [
//       // Mock unpaid user data
//     ];
//     spyOn(store, 'select').and.returnValue(of(mockUnpaidUserData));
//     component.ngOnInit();
//     component.paymentCategoryController.setValue('unpaid');
//     fixture.detectChanges(); // Trigger change detection
//     expect(fixture.nativeElement.querySelector('#allUnpaidList')).toBeTruthy();
//   });
// });