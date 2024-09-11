// import { AfterViewChecked, Component, ElementRef, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
// import { ChatService } from '../../../../../Services/chat.service';
// import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { Router } from '@angular/router';
// import { BackendDataService } from '../../../../../Services/backend-data.service';
// import { Store } from '@ngrx/store';
// import { AppState } from '../../../../../States/app.state';
// import { getUser } from '../../../../States/DevoteeList/userlist.selector';
// import { loadUser } from '../../../../States/DevoteeList/userlist.actions';
// import { ChatMessage, userList } from '../../../../../models/backend';
// import { Subject, takeUntil } from 'rxjs';

// @Component({
//   selector: 'app-chat',
//   standalone: true,
//   imports: [FormsModule, CommonModule, ReactiveFormsModule],
//   templateUrl: './chat.component.html',
//   styleUrl: './chat.component.css'
// })
// export class ChatComponent implements OnInit, AfterViewChecked, OnDestroy {
//   @ViewChild('scrollMe') scrollContainer!: ElementRef;
//   inputText: string = "";
//   logInUserName: string = "";
//   roomName: string = "";
//   AllUsers: userList[] = []
//   loader: boolean = true;
//   selectedListItem: string = "Group Chat";
//   AllActiveUses: string = ""
//   SearchUsers: userList[] = []

//   messages: ChatMessage[] = []
//   private destroy$ = new Subject<void>();


//   constructor(protected chatService: ChatService, private store: Store<AppState>, private router: Router, private backendService: BackendDataService) {
//     const userData = this.backendService.getuserFromLocalStorage()
//     this.chatService.user = []
//     this.chatService.message = []
//     this.messages = []
//     console.log("render");

//     if (userData!['name']) {
//       this.logInUserName = userData!['name']
//     } else {
//       this.logInUserName = userData!['id']
//     }
//     this.roomName = "Spiritual Center"

//     setTimeout(() => {
//       this.loader = false

//     }, 2000);


//   }

//   searchUserForm = new FormGroup({
//     searchValue: new FormControl("")
//   })

//   get searchUserInput() {
//     return this.searchUserForm.get("searchValue") as FormControl
//   }


//   ngOnInit(): void {
//     this.store.dispatch(loadUser())
//     this.store.select(getUser).subscribe((user) => {
//       this.AllUsers = user
//       this.SearchUsers = user
//     })


//     // Connect to SignalR when component initializes
//     this.chatService.start(this.logInUserName,this.roomName); 

//     this.chatService.messages$.pipe(takeUntil(this.destroy$)).subscribe(messages => {
//       this.messages = messages;
//     });

//     this.chatService.getUsers().then(() => {
//       this.chatService.connectedUsers$.subscribe((d) => {
//         this.AllActiveUses = d.toString()
//       })
//     })

//     this.searchUserForm.get("searchValue")?.valueChanges.subscribe((d) => {
//       this.AllUsers = this.SearchUsers.filter((d) => d.firstName.toLowerCase().toString().includes(this.searchUserInput.value))
//     })


//   }

//   ngAfterViewChecked(): void {
//     this.scrollContainer.nativeElement.scrollTop =
//       this.scrollContainer.nativeElement.scrollHeight
//   }

//   sendMessage() {
//     if (this.inputText.trim() !== '') {
//       this.chatService.sendMessage(this.inputText).then(()=>{
//         this.inputText = ""
//       });
//     }
//   }

//   leavechat() {
//     this.chatService.leaveChat().then(
//       () => {

//       }
//     ).catch((err) => {
//       console.log(err);

//     })
//   }

//   onListItemClick(listItem: any) {
//     if (this.selectedListItem != listItem) {
//       console.log(listItem);
//       this.selectedListItem = listItem;
//       if (this.selectedListItem === 'Group Chat') {
//         this.roomName = "Spiritual Center"
//       } else {
//         console.log(this.logInUserName);
//         console.log(listItem);
//         const setRoomName = (listItem + this.logInUserName).toLowerCase().split("").sort().join('').toString()
//         this.roomName = setRoomName
//       }
//       // this.chatService.connection.stop().then(()=>{
//       //   this.chatService.start().then(() => {
//       //     this.chatService.message = []
//       //     this.chatService.user = []
//       //     this.chatService.joinRoom(this.logInUserName, this.roomName).then(() => {

//       //     })
//       //   })
//       // })

//     }
//   }
//   ngOnDestroy(): void {
//     this.destroy$.next();
//     this.destroy$.complete();

//     // Disconnect from SignalR when component is destroyed
//     this.chatService.leaveChat();
//   }
// }












































import { AfterViewChecked, Component, ElementRef, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ChatService } from '../../../../../Services/chat.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BackendDataService } from '../../../../../Services/backend-data.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../States/app.state';
import { getUser } from '../../../../States/DevoteeList/userlist.selector';
import { loadUser } from '../../../../States/DevoteeList/userlist.actions';
import { userList } from '../../../../../models/backend';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('scrollMe') scrollContainer!: ElementRef;
  messages: any[] = []
  inputText: string = "";
  logInUserName: string = "";
  roomName: string = "";
  AllUsers: userList[] = []
  loader: boolean = true;
  selectedListItem: string = "Group Chat";
  AllActiveUses: string = ""
  SearchUsers: userList[] = []


  constructor(protected chatService: ChatService, private store: Store<AppState>, private router: Router, private backendService: BackendDataService) {
    const userData = this.backendService.getuserFromLocalStorage()


    if (userData!['name']) {
      this.logInUserName = userData!['name']
    } else {
      this.logInUserName = userData!['id']
    }
    this.roomName = "Spiritual Center"

    setTimeout(() => {
      this.loader = false

    }, 2000);


  }

  searchUserForm = new FormGroup({
    searchValue: new FormControl("")
  })

  get searchUserInput() {
    return this.searchUserForm.get("searchValue") as FormControl
  }


  ngOnInit(): void {
    this.store.dispatch(loadUser())
    this.store.select(getUser).subscribe((user) => {
      this.AllUsers = user
      this.SearchUsers = user
    })
    this.chatService.message = []
    this.chatService.user = []

   this.chatService.startConnection(this.logInUserName,this.roomName)
   
    this.chatService.messages$.subscribe((d) => {
      this.messages = d
    })

    this.chatService.connectedUsers$.subscribe((d) => {
      this.AllActiveUses = d.toString()
    })


    this.searchUserForm.get("searchValue")?.valueChanges.subscribe((d) => {
      this.AllUsers = this.SearchUsers.filter((d) => d.firstName.toLowerCase().toString().includes(this.searchUserInput.value))
    })
  }

  ngAfterViewChecked(): void {
    this.scrollContainer.nativeElement.scrollTop =
      this.scrollContainer.nativeElement.scrollHeight
  }

  sendMessage() {
    if (this.inputText.trim() !== '') {
      this.chatService.sendMessage(this.inputText).then(
        () => {
          this.inputText = ""
        }
      ).catch((err) => {
        console.log(err);
      })
    }
  }

  leavechat() {
    this.chatService.leaveChat().then(
      () => {

      }
    ).catch((err) => {
      console.log(err);

    })
  }

  onListItemClick(listItem: any) {
    if (this.selectedListItem != listItem) {
      this.selectedListItem = listItem;
      if (this.selectedListItem === 'Group Chat') {
        this.roomName = "Spiritual Center"
      } else {
        const setRoomName = (listItem + this.logInUserName).toLowerCase().split("").sort().join('').toString()
        this.roomName = setRoomName
      }
      this.chatService.connection.stop().then(() => {
        this.chatService.start().then(() => {
          this.chatService.message = []
          this.chatService.user = []
          this.chatService.joinRoom(this.logInUserName, this.roomName).then(() => {

          })
        })
      })

    }
  }

  enterFun() {
    if (this.inputText.trim() !== '') {
      this.chatService.sendMessage(this.inputText).then(
        () => {
          this.inputText = ""
        }
      ).catch((err) => {
        console.log(err);
      })
    }
  }
  ngOnDestroy(): void {
    this.chatService.leaveChat()
  }
}



