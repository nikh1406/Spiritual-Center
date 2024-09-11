import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatService } from '../../../../../Services/chat.service';

@Component({
  selector: 'app-join-room-devotee',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './join-room.component.html',
  styleUrl: './join-room.component.css'
})
export class JoinRoomComponent implements OnInit {


  joinRoomForm!: FormGroup;

  constructor(private Router: Router, private chatservice: ChatService) { }
  ngOnInit(): void {
    this.joinRoomForm = new FormGroup({
      user: new FormControl("", Validators.required),
      room: new FormControl("", Validators.required)
    })
  }

  joinRoom() {
    const { user, room } = this.joinRoomForm.value;

    sessionStorage.setItem("user",user);
    sessionStorage.setItem("room",room);
    this.chatservice.joinRoom(user, room)
      .then(() => {
          this.Router.navigate(['/devotee/chat'])
        }).catch((err)=>{
          console.log(err);
          
        })
  }
}
