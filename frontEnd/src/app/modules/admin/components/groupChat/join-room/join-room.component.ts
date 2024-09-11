import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatService } from '../../../../../Services/chat.service';

@Component({
  selector: 'app-join-room',
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
    this.Router.navigate(['/admin/chat'])
    // this.chatservice.joinRoom(user, room)
    //   .then(() => {
    //     }).catch((err)=>{
    //       console.log(err);
          
    //     })
  }
}
