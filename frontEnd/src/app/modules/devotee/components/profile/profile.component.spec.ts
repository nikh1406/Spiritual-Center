import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
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
import { loginResponse, userList } from '../../../../models/backend';
import { BackendDataService } from '../../../../Services/backend-data.service';
import { of } from 'rxjs';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let backendDataService: BackendDataService;
  let debugelement: DebugElement;


  const mockUsers: userList[] = [
    { devoteeId: "2024-ki-ka-7", firstName: 'John', lastName: 'Doe', emailid: 'john.doe@example.com', area: "cvdfg", city: "dsfds", flatNumber: 41, initiationDate: new Date(), pincode: "395006", middleName: "fhgf", state: "sgf", photo: "model.png" }
  ];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileComponent],
      providers: [

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
        provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }), provideClientHydration()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    debugelement = fixture.debugElement;
    backendDataService = TestBed.inject(BackendDataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user data and set photoUrl on ngOnInit', () => {
    const mockUserData: userList[] = [
      {
        devoteeId: '2024-ki-ka-7',
        firstName: 'John',
        middleName: 'M',
        lastName: 'Doe',
        area: 'Some Area',
        city: 'Some City',
        pincode: '123456',
        emailid: 'john.doe@example.com',
        photo: 'model.png',
        flatNumber: 0,
        state: 'dsf',
        initiationDate: 'dsf'
      }
    ];
    // Mock getuserFromLocalStorage return value
    const mockUser: loginResponse = {
      expiration: "2024-07-30T13:24:33Z",
      id: "2024-ki-ka-7",
      img: "model.png",
      name: "kikhil",
      role: "Devotee",
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL"
    };

    const spyGetuserList = spyOn(backendDataService, 'getuserList').and.returnValue(of(mockUserData));
    const spyGetUserFromLocalStorage = spyOn(backendDataService, 'getuserFromLocalStorage').and.returnValue(mockUser);
    component.ngOnInit();
    expect(spyGetuserList).toHaveBeenCalled();
    expect(spyGetUserFromLocalStorage).toHaveBeenCalled();
    expect(component.photoUrl).toEqual(backendDataService.imgUrl + 'model.png');
    expect(component.userData).toEqual(mockUserData);
  });

  it('should display user profile details when userData is available', () => {
    component.userData = [
      {
        devoteeId: "123",
        firstName: 'John',
        middleName: 'Doe',
        lastName: 'Smith',
        area: 'ABC',
        city: 'XYZ',
        pincode: "123456",
        emailid: 'john.doe@example.com',
        photo: 'model.png',
        flatNumber: 0,
        state: '',
        initiationDate: ''
      },
    ];
    fixture.detectChanges();

    const fullNameElement = debugelement.query(By.css('#fullname'));
    const areaElement = debugelement.query(By.css('.list-group-item:nth-child(2)'));
    const cityElement = debugelement.query(By.css('.list-group-item:nth-child(3)'));
    const pincodeElement = debugelement.query(By.css('.list-group-item:nth-child(4)'));
    const emailElement = debugelement.query(By.css('.list-group-item:nth-child(5)'));

    expect(fullNameElement.nativeElement.textContent).toContain('John Doe Smith');
    expect(areaElement.nativeElement.textContent).toContain('ABC');
    expect(cityElement.nativeElement.textContent).toContain('XYZ');
    expect(pincodeElement.nativeElement.textContent).toContain('123456');
    expect(emailElement.nativeElement.textContent).toContain('john.doe@example.com');
  })

  it('should display "No Content Found!" when userData is empty', () => {
    component.userData = [];
    fixture.detectChanges();

    const noContentElement = debugelement.query(By.css('#noContent'));
    expect(noContentElement.nativeElement.textContent).toContain('No Content Found!');
  });
});


