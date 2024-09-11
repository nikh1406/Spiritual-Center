import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { isDevMode } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, Router } from '@angular/router';
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
import { userList } from '../../../../models/backend';
import { deleteUser, loadUser } from '../../../States/DevoteeList/userlist.actions';
import { of } from 'rxjs';
import { setloadingspinner } from '../../../../States/LoaderState/loader.action';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let store: Store<AppState>;
  let backendDataService: BackendDataService;
  let router: Router;

  const mockUsers: userList[] = [
    { devoteeId: "2024-ki-ka-7", firstName: 'John', lastName: 'Doe', emailid: 'john.doe@example.com' ,area:"cvdfg",city:"dsfds",flatNumber:41,initiationDate:new Date(),pincode:"395006",middleName:"fhgf",state:"sgf"},
      { devoteeId: "2024-Ni-Sa-4", firstName: 'Jane', lastName: 'Doe', emailid: 'jane.doe@example.com' ,area:"cvdfg",city:"dsfds",flatNumber:41,initiationDate:new Date(),pincode:"395006",middleName:"fhgf",state:"sgf"}
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListComponent,ReactiveFormsModule],
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
    
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    backendDataService = TestBed.inject(BackendDataService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct data', () => {
    expect(component.PhotoURl).toEqual('https://photostore123.s3.eu-north-1.amazonaws.com/');
    expect(component.UserList).toEqual([]); 
    expect(component.p).toEqual(1);
    expect(component.config.itemsPerPage).toEqual(2);
    expect(component.config.currentPage).toEqual(1);
  });

  it('should dispatch loadUser action on ngOnInit', () => {
    const spy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith(loadUser());
  });

  it('should fetch user list from backend service', () => {
    const spy = spyOn(backendDataService, 'getuserList');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should update UserList with fetched data', () => {
    const spy = spyOn(store, 'select').and.returnValue(of(mockUsers));
    component.ngOnInit();
    expect(component.UserList).toEqual(mockUsers);
  });

  it('should dispatch setloadingspinner action on ngOnInit', () => {
    const spy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith(setloadingspinner({ status: true }));
  });

  it('should sort UserList in ascending order on sortByAsc', () => {
    component.UserList = [
      { ...mockUsers[1], firstName: 'Zane' },
      { ...mockUsers[0], firstName: 'John' },
    ];
    console.log(component.UserList);
    component.sortByAsc();
    expect(component.UserList[0].firstName).toEqual('John');
    expect(component.UserList[1].firstName).toEqual('Zane');
  });

  it('should sort UserList in descending order on sortByDesc', () => {
    component.UserList = [
      { ...mockUsers[1], firstName: 'Zane' },
      { ...mockUsers[0], firstName: 'John' },
    ];
    console.log(component.UserList);
    
    component.sortByDesc();
    expect(component.UserList[0].firstName).toEqual('Zane');
    expect(component.UserList[1].firstName).toEqual('John');
  });

  it('should filter UserList based on search input', () => {
    component.UserList = mockUsers;
    component.serchvalController.setValue('John');
    expect(component.UserList).toEqual([mockUsers[0]]);
  });

//   it('should reset UserList on clearing search input', () => {
//     component.UserList = mockUsers;
//     const valueChangesSpy = spyOn<FormControl>(component.serchvalController, 'valueChanges').and.callThrough();

//  // Simulate search input value change
//     component.serchvalController.setValue('Jane');
//     component.serchvalController.updateValueAndValidity();
//     expect(component.UserList).toEqual([mockUsers[0]]);

//      // Clear the search input
//      component.serchvalController.setValue('');
//      component.serchvalController.updateValueAndValidity();
   
//       // Expect UserList to be reset
//     expect(component.UserList).toEqual(mockUsers);

//     // Verify that valueChanges was called with the correct values
//     expect(valueChangesSpy).toHaveBeenCalledTimes(2); 
    
//   });
// it('should reset UserList on clearing search input', () => {
//   component.UserList = mockUsers;
//   const valueChangesSpy = spyOn<FormControl>(component.serchvalController, 'valueChanges').and.callThrough();
  
//   // Simulate search input value change
//   component.serchvalController.setValue('Jane');
//   // Trigger the value change event (might be necessary depending on your implementation)
//   component.serchvalController.updateValueAndValidity();
  
//   // You might need to wait for change detection here depending on your filtering logic.
//   // For example:
//   fixture.detectChanges(); 

//   expect(component.UserList).toEqual([mockUsers[0]]); // Assuming your filtering logic works as intended

//   // Clear the search input
//   component.serchvalController.setValue('');
//   // Trigger the value change event
//   component.serchvalController.updateValueAndValidity();

//   // You might need to wait for change detection here as well.
//   // For example:
//   fixture.detectChanges();

//   // Expect UserList to be reset
//   expect(component.UserList).toEqual(mockUsers);

//   // Verify that valueChanges was called with the correct values
//   expect(valueChangesSpy).toHaveBeenCalledTimes(2); // Expect 2 calls, one for 'Jane', one for ''
// });

 

  it('should navigate to edit user route on editUser', () => {
    const spy = spyOn(router, 'navigate');
    component.editUser(mockUsers[0]);
    expect(spy).toHaveBeenCalledWith(['/admin/edituser']);
  });

  it('should dispatch deleteUser action on deleteUser', () => {
    const spy = spyOn(store, 'dispatch');
    component.deleteUser(mockUsers[0].devoteeId!);
    expect(spy).toHaveBeenCalledWith(deleteUser({ id: mockUsers[0].devoteeId! }));
  });
});
