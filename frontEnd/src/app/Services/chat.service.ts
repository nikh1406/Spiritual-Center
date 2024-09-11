// import { Injectable } from '@angular/core';
// import * as signalR from '@microsoft/signalr';
// import { BehaviorSubject } from 'rxjs';
// import { ChatMessage } from '../models/backend';
// @Injectable({
//   providedIn: 'root'
// })
// export class ChatService {

//   public connection: signalR.HubConnection = new signalR.HubConnectionBuilder()
//     .withUrl("https://localhost:7158/chat")
//     .configureLogging(signalR.LogLevel.Information)
//     .build();

//   public messages$ = new BehaviorSubject<ChatMessage[]>([]);
//   public connectedUsers$ = new BehaviorSubject<string[]>([]);
//   public message: ChatMessage[] = []
//   public user: string[] = []

//   constructor() {  }

//   // Start Connection
//   public async start(user: string, room: string) {
//     try {
//       await this.connection.start();
//       console.log("Connection is established!");

//       // Register for messages after connection is established
//       this.connection.on("ReceiveMessage", async (sender: string, content: string, timestamp: string) => {
//         this.message.push({
//           sender: sender,
//           content: content,
//           timestamp: timestamp
//         });

//         this.messages$.next(this.message); // Update the BehaviorSubject


//        // Join the room
//        await this.connection.invoke('JoinRoom', {room: room,user: user});
//       });
//     } catch (err) {
//       console.log("SignalR Connection Error: ",err);
//     }
//   }



//   public async getUsers() {
//     try {
//       this.connection.on("ConnectedUser", (users: any) => {
//         this.connectedUsers$.next(users)
//       })
//     } catch (e) {
//       console.log("Something went wrong when getting Users , Error => ", e);
//     }
//   }



//   // send Message
//   public async sendMessage(message: string) {
//     if (this.connection) {
//       try {
//         await this.connection.invoke('sendMessage', message);
//       } catch (error) {
//         console.error('SignalR Send Message Error: ', error);
//       }
//     }
//   }

//   // leave Message
//   public async leaveChat() {
//     if(this.connection){
//       try {
//       this.connection.off('ReceiveMessage')
//         await this.connection.stop();
//       } catch (error) {
//         console.error('SignalR Disconnect Error: ', error);
//       }
//     }
//   }
// }






























import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { ChatMessage } from '../models/backend';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public connection: signalR.HubConnection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7158/chat")
    .configureLogging(signalR.LogLevel.Information)
    .build();


  public messages$ = new BehaviorSubject<ChatMessage[]>([]);
  public connectedUsers$ = new BehaviorSubject<string[]>([]);
  public message: ChatMessage[] = []
  public user: string[] = []

  constructor() {

    try {
      this.connection.on("ReceiveMessage", (user: string, message: string, messageTime: string) => {

        this.message.push({
          sender: user,
          content: message,
          timestamp: messageTime
        });

        this.messages$.next(this.message)
      });
    }
    catch (e) {
      console.log("Something went wrong when getting Messages , Error => ", e);
    }

    try {
      this.connection.on("ConnectedUser", (users: any) => {
        this.connectedUsers$.next(users)
      })
    }
    catch (e) {
      console.log("Something went wrong when getting Users , Error => ", e);
    }


  }

  // Start Connection
  public async start() {
    try {
      await this.connection.start();
      console.log("Connection is established!");
    } catch (err) {
      console.log(err);
    }
  }

  public async startConnection(user: string, room: string) {
    try {
      await this.connection.start();
      console.log("Connection is established!");

      await this.connection.invoke('JoinRoom', { room: room, user: user });

    } catch (err) {
      console.log("SignalR Connection Error: ", err);
    }
  }

 

  // Join Room
  public async joinRoom(user: string, room: string) {
    return this.connection.invoke("JoinRoom", { user, room })
  }

  // send Message
  public async sendMessage(message: string) {
    if (this.connection) {
      try {
        await this.connection.invoke('sendMessage', message);
      } catch (error) {
        console.error('SignalR Send Message Error: ', error);
      }
    }
  }

  // leave Message
  public async leaveChat() {
    if (this.connection) {
      try {
        await this.connection.stop();
        this.message = []
        this.user = []
      } catch (error) {
        console.error('SignalR Disconnect Error: ', error);
      }
  }
  }
}
