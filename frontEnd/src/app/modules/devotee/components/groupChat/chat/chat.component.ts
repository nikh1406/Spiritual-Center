import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../../../../../Services/chat.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { BackendDataService } from '../../../../../Services/backend-data.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../States/app.state';
import { loadUser } from '../../../../States/DevoteeList/userlist.actions';
import { getUser } from '../../../../States/DevoteeList/userlist.selector';
import { userList } from '../../../../../models/backend';

@Component({
  selector: 'app-chat-devotee',
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

    this.chatService.start().then(() => {
      this.chatService.joinRoom(this.logInUserName, this.roomName).then(() => {
      }).catch((err) => {
        console.log(err);
      })
    })

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
    this.chatService.sendMessage(this.inputText).then(
      () => {
        this.inputText = ""
      }
    ).catch((err) => {
      console.log(err);
    })
  }



  leavechat() {
    this.chatService.leaveChat().catch((err) => {
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
        this.chatService.message = []
        this.chatService.user = []
        this.chatService.start().then(() => {
          this.chatService.joinRoom(this.logInUserName, this.roomName).then(() => {

          })
        })
      })
    }

  }
  ngOnDestroy(): void {
    this.chatService.connection.stop().then(() => {
      this.chatService.message = []
      this.chatService.user = []
    })
  }
}
