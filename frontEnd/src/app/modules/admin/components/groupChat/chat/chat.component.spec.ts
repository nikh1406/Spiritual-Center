import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatComponent } from './chat.component';
import { ChatService } from '../../../../../Services/chat.service';
import { BackendDataService } from '../../../../../Services/backend-data.service';
import { DebugElement, ElementRef, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideToastr } from 'ngx-toastr';
import { routes } from '../../../../../app.routes';
import { appReducer } from '../../../../../States/app.state';
import { LoginEffects } from '../../../../../States/LoginState/login.effects';
import { CustomSerializer } from '../../../../../States/RoutersState/custom-serializer';
import { UserListEffects } from '../../../../States/DevoteeList/userlist.effects';
import { PaymentsEffects } from '../../../../States/payment/payments.effects';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;
  let chatServiceSpy: jasmine.SpyObj<ChatService>;
  let backendDataServiceSpy: jasmine.SpyObj<BackendDataService>;

  beforeEach(async () => {
    chatServiceSpy = jasmine.createSpyObj('ChatService', ['start', 'joinRoom', 'sendMessage', 'leaveChat', 'messages$', 'connectedUsers$']);
    backendDataServiceSpy = jasmine.createSpyObj('BackendDataService', ['getuserFromLocalStorage']);

    await TestBed.configureTestingModule({
      imports: [ChatComponent, FormsModule, CommonModule],
      providers: [
        // { provide: ChatService, useValue: chatServiceSpy },
        // { provide: BackendDataService, useValue: backendDataServiceSpy },
        provideRouter(routes), provideHttpClient(withFetch()), provideToastr({
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
        provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }), provideClientHydration()

      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();




  });

  beforeAll(async () => {
    if (!localStorage.getItem("userData")) {
      const data = {
        expiration: "2024-08-01T17:08:34Z", id: "admin", img: null, name: null, role: "Admin", token: "U2FsdGVkX18"
      }
    }
    
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize and subscribe to services', () => {
    // Verify that start method of chatService is called
    expect(chatServiceSpy.start).toHaveBeenCalled();

    // Verify that joinRoom method of chatService is called with correct arguments
    expect(chatServiceSpy.joinRoom).toHaveBeenCalledWith('admin', 'Spiritual Center');

    // Verify that messages$ and connectedUsers$ subscriptions are set up
    expect(chatServiceSpy.messages$).toBeDefined();
    expect(chatServiceSpy.connectedUsers$).toBeDefined();
  });
});


// describe('ChatComponent', () => {
//   let component: ChatComponent;
//   let fixture: ComponentFixture<ChatComponent>;
//   let chatService: ChatService;
//   let backendDataService: BackendDataService;
//   let scrollContainer: ElementRef;

//   beforeEach(async () => {
//     const mockChatService = jasmine.createSpyObj('ChatService', ['start', 'joinRoom', 'sendMessage', 'leaveChat', 'messages$', 'connectedUsers$']);
//     const mockBackendDataService = jasmine.createSpyObj('BackendDataService', ['getuserFromLocalStorage']);

//     await TestBed.configureTestingModule({
//       imports: [FormsModule, CommonModule, RouterTestingModule],
//       declarations: [ChatComponent],
//       providers: [
//         { provide: ChatService, useValue: mockChatService },
//         { provide: BackendDataService, useValue: mockBackendDataService },
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(ChatComponent);
//     component = fixture.componentInstance;
//     chatService = TestBed.inject(ChatService);
//     backendDataService = TestBed.inject(BackendDataService);
//     scrollContainer = fixture.debugElement.query(ElementRef);
//   });

//   beforeEach(() => {
//     // Set up mock data
//     component.logInUserName = 'testUser';
//     component.roomName = 'Spiritual Center';
//     component.messages = [];
//     component.AllActiveUsers = [];
//     component.inputText = '';
//     component.loader = false;

//     // Mock backend data service
//     mockBackendDataService.getuserFromLocalStorage.and.returnValue({ id: 'testUser' });

//     // Mock chat service subscriptions
//     chatService.messages$.next([]);
//     chatService.connectedUsers$.next([]);

//     // Mock scroll container
//     scrollContainer.nativeElement.scrollTop = 0;
//     scrollContainer.nativeElement.scrollHeight = 100;
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should initialize and subscribe to services', () => {
//     // Verify that start method of chatService is called
//     expect(chatService.start).toHaveBeenCalled();

//     // Verify that joinRoom method of chatService is called with correct arguments
//     expect(chatService.joinRoom).toHaveBeenCalledWith('testUser', 'Spiritual Center');

//     // Verify that messages$ and connectedUsers$ subscriptions are set up
//     expect(chatService.messages$).toBeDefined();
//     expect(chatService.connectedUsers$).toBeDefined();
//   });

//   it('should update messages array when receiving new messages', () => {
//     const newMessages = [{ sender: 'testUser', content: 'Hello', timestamp: new Date() }];
//     chatService.messages$.next(newMessages);
//     expect(component.messages).toEqual(newMessages);
//   });

//   it('should update AllActiveUsers array when receiving new user list', () => {
//     const newUsers = ['user1', 'user2'];
//     chatService.connectedUsers$.next(newUsers);
//     expect(component.AllActiveUsers).toEqual(newUsers);
//   });

//   it('should scroll to bottom of chat container after view checked', () => {
//     // Trigger ngAfterViewChecked
//     component.ngAfterViewChecked();
//     expect(scrollContainer.nativeElement.scrollTop).toEqual(100);
//   });

//   it('should send message when sendMessage is called', () => {
//     component.inputText = 'Test message';
//     chatService.sendMessage.and.returnValue(Promise.resolve());
//     component.sendMessage();
//     expect(chatService.sendMessage).toHaveBeenCalledWith('Test message');
//     expect(component.inputText).toEqual('');
//   });

//   it('should handle sendMessage error', () => {
//     component.inputText = 'Test message';
//     chatService.sendMessage.and.returnValue(throwError(() => new Error('Error sending message')));
//     component.sendMessage();
//     expect(chatService.sendMessage).toHaveBeenCalledWith('Test message');
//     expect(component.inputText).toEqual('');
//   });

//   it('should leave chat when leavechat is called', () => {
//     chatService.leaveChat.and.returnValue(Promise.resolve());
//     component.leavechat();
//     expect(chatService.leaveChat).toHaveBeenCalled();
//   });

//   it('should handle leavechat error', () => {
//     chatService.leaveChat.and.returnValue(throwError(() => new Error('Error leaving chat')));
//     component.leavechat();
//     expect(chatService.leaveChat).toHaveBeenCalled();
//   });

//   it('should unsubscribe from services on destroy', () => {
//     spyOn(chatService.messages$, 'unsubscribe');
//     spyOn(chatService.connectedUsers$, 'unsubscribe');
//     component.ngOnDestroy();
//     expect(chatService.messages$.unsubscribe).toHaveBeenCalled();
//     expect(chatService.connectedUsers$.unsubscribe).toHaveBeenCalled();
//   });

//   it('should handle chat service start error', () => {
//     chatService.start.and.returnValue(throwError(() => new Error('Error starting chat service')));
//     component.ngOnInit();
//     expect(chatService.start).toHaveBeenCalled();
//     expect(chatService.joinRoom).not.toHaveBeenCalled();
//   });

//   it('should handle chat service joinRoom error', () => {
//     chatService.start.and.returnValue(Promise.resolve());
//     chatService.joinRoom.and.returnValue(throwError(() => new Error('Error joining chat room')));
//     component.ngOnInit();
//     expect(chatService.start).toHaveBeenCalled();
//     expect(chatService.joinRoom).toHaveBeenCalled();
//   });
// });