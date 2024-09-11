import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MypaymentsComponent } from './mypayments.component';
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
import { loginResponse, payment } from '../../../../models/backend';
import { loadpayment } from '../../../States/payment/payment.action';
import { of } from 'rxjs';
import { getPayments, paymentSelector, PAYMETS_STATE_NAME } from '../../../States/payment/payment.selector';
import { PaymentState } from '../../../States/payment/payment.state';

describe('MypaymentsComponent', () => {
  let component: MypaymentsComponent;
  let fixture: ComponentFixture<MypaymentsComponent>;
  let store: Store<{ [PAYMETS_STATE_NAME]: PaymentState; }>;
  let backendService: BackendDataService
  // Mock Store Data
  const mockPayments: payment[] = [
    { devoteeId: "2024-Ds-As-7", month: 7, year: 2023, amount: 15000, paymentMethod: '' },
    { devoteeId: "2024-Da-As-6", month: 6, year: 2023, amount: 5000, paymentMethod: '' },
    { devoteeId: "2024-Ds-As-5", month: 5, year: 2023, amount: 8000, paymentMethod: '' },
  ];
  // Mock User Data
  const mockUser: loginResponse[] = [{
    id: "2024-Ds-As-7",
    token: '',
    role: '',
    expiration: '',
    name: '',
    img: ''
  }];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MypaymentsComponent],
      providers: [
        { provide: Store, useValue: { select: jasmine.createSpy('select').and.returnValue(of(mockPayments)) } },
        { provide: BackendDataService, useValue: { getuserFromLocalStorage: jasmine.createSpy('getuserFromLocalStorage').and.returnValue(mockUser) } },
        provideRouter(routes), provideHttpClient(withFetch()), provideToastr({
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
        provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }), provideClientHydration()],

    })
      .compileComponents();

    fixture = TestBed.createComponent(MypaymentsComponent);
    component = fixture.componentInstance;
    backendService = TestBed.inject(BackendDataService)
    store = TestBed.inject(Store);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadpayment action', () => {

    const spy = spyOn(store, 'dispatch')
    component.ngOnInit()
    expect(spy).toHaveBeenCalledWith(loadpayment());
  });

  it('should render table with correct data', () => {
    component.userPaymentList = mockPayments;
    fixture.detectChanges();

    const tableRows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(tableRows.length).toBe(3);

    expect(tableRows[0].querySelector('td:nth-child(1)').textContent).toBe('2024-Ds-As-7');
    expect(tableRows[0].querySelector('td:nth-child(2)').textContent).toBe('7');
    expect(tableRows[0].querySelector('td:nth-child(3)').textContent).toBe('2023');
    expect(tableRows[0].querySelector('td:nth-child(4)').textContent).toBe('15000');
    expect(tableRows[0].classList).toContain('bg-green');

    expect(tableRows[1].querySelector('td:nth-child(1)').textContent).toBe('2024-Da-As-6');
    expect(tableRows[1].querySelector('td:nth-child(2)').textContent).toBe('6');
    expect(tableRows[1].querySelector('td:nth-child(3)').textContent).toBe('2023');
    expect(tableRows[1].querySelector('td:nth-child(4)').textContent).toBe('5000');
    expect(tableRows[1].classList).not.toContain('bg-green');


  });

  // it('should filter payments based on user ID', () => {
  //   storeSpy.select.and.returnValue(of(mockPayments));
  //   backendSpy.getuserFromLocalStorage.and.returnValue(mockUser);
  //   component.ngOnInit();
  //   // Assertions
  //   expect(storeSpy.select).toHaveBeenCalledWith(getPayments);
  //   expect(backendSpy.getuserFromLocalStorage).toHaveBeenCalled();
  //   expect(component.userPaymentList).toEqual([
  //     { devoteeId: "2024-Ds-As-7", month: 7, year: 2023, amount: 15000, paymentMethod: '' }
  //   ]);
  // });


  // it('should filter payments based on user ID', () => {


  //   const serviceSpy = spyOn(backendService, 'getuserFromLocalStorage').and.returnValue(mockUser[0])
  //   const selectSpy = spyOn(store, 'select').and.returnValue(of(mockPayments));
  //   console.log(selectSpy);

  //   component.ngOnInit();
  //   expect(selectSpy).toHaveBeenCalledWith(getPayments)

  // });



  //   it('should handle pagination change', () => {
  //   const paginationControls = fixture.nativeElement.querySelector('pagination-controls');
  //   expect(paginationControls).toBeDefined();
  //   const pageChangeEvent = new Event('pageChange');
  //   paginationControls.dispatchEvent(pageChangeEvent);
  //   console.log(component.p);

  //   expect(component.p).toBe(2); // Assuming default page is 1
  // });

  // it('should filter user payments', () => {

  //   component.userPaymentList = mockPayments
  //   component.ngOnInit();
  //   fixture.detectChanges();

  //   const tableRows = fixture.nativeElement.querySelectorAll('tbody tr');
  //   expect(tableRows.length).toBe(1);


  //   expect(tableRows[0].querySelector('td:nth-child(1)').textContent).toBe('2024-Ds-As-7');
  //   expect(tableRows[0].querySelector('td:nth-child(2)').textContent).toBe('7');
  //   expect(tableRows[0].querySelector('td:nth-child(3)').textContent).toBe('2023');
  //   expect(tableRows[0].querySelector('td:nth-child(4)').textContent).toBe('15000');
  // });

});


// it('should paginate data', () => {
//   const mockPayments: payment[] = [
//     {
//       devoteeId: '2024-Ds-As-7',
//       month: 7,
//       year: 2023,
//       amount: 15000,
//     },
//     {
//       devoteeId: '2024-Da-As-6',
//       month: 6,
//       year: 2023,
//       amount: 5000,
//     },
//     {
//       devoteeId: '2024-Ds-As-5',
//       month: 5,
//       year: 2023,
//       amount: 8000,
//     },
//     {
//       devoteeId: '2024-Ds-As-4',
//       month: 4,
//       year: 2023,
//       amount: 12000,
//     },
//     {
//       devoteeId: '2024-Ds-As-3',
//       month: 3,
//       year: 2023,
//       amount: 7000,
//     },
//   ];

//   store.overrideSelector(getPayments, mockPayments);
//   component.ngOnInit();
//   fixture.detectChanges();

//   const tableRows = fixture.nativeElement.querySelectorAll('tbody tr');
//   expect(tableRows.length).toBe(5);

//   component.p = 2;
//   fixture.detectChanges();

//   const tableRowsAfterPagination = fixture.nativeElement.querySelectorAll('tbody tr');
//   expect(tableRowsAfterPagination.length).toBe(0);
// });

// it('should filter user payments', () => {
//   const mockPayments: payment[] = [
//     {
//       devoteeId: '2024-Ds-As-7',
//       month: 7,
//       year: 2023,
//       amount: 15000,
//     },
//     {
//       devoteeId: '2024-Da-As-6',
//       month: 6,
//       year: 2023,
//       amount: 5000,
//     },
//     {
//       devoteeId: '2024-Ds-As-5',
//       month: 5,
//       year: 2023,
//       amount: 8000,
//     },
//   ];

//   store.overrideSelector(getPayments, mockPayments);
//   component.ngOnInit();
//   fixture.detectChanges();

//   const tableRows = fixture.nativeElement.querySelectorAll('tbody tr');
//   expect(tableRows.length).toBe(1);

//   expect(tableRows[0].querySelector('td:nth-child(1)').textContent).toBe('2024-Ds-As-7');
//   expect(tableRows[0].querySelector('td:nth-child(2)').textContent).toBe('7');
//   expect(tableRows[0].querySelector('td:nth-child(3)').textContent).toBe('2023');
//   expect(tableRows[0].querySelector('td:nth-child(4)').textContent).toBe('15000');
// });



