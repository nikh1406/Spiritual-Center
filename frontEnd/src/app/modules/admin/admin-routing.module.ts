import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EdituserComponent } from './components/edituser/edituser.component';
import { HomeComponent } from './components/home/home.component';

import { DonationsComponent } from './components/donations/donations.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { adminGuard } from '../../guard/guard/admin.guard';
import { WelcomeComponent } from './components/groupChat/welcome/welcome.component';
import { JoinRoomComponent } from './components/groupChat/join-room/join-room.component';
import { ChatComponent } from './components/groupChat/chat/chat.component';


const routes: Routes = [
  {
    path: "",
    title: "Admin-Home | SpiritualCentre",
    component: HomeComponent,
    canActivateChild:[adminGuard],
    children: [
    {
      path: "userlist", 
      component: UserListComponent, 
      title:"Userlist | Admin"
    },
    {
      path: "createuser",
      component: UserCreateComponent,
      title:"New User | Admin"

    },
    {
      path: "donations",
      component: DonationsComponent,
      title:"Donation | Admin"
      
    },
    {
      path:"groupChat",
      component:WelcomeComponent,
      title:"Home | GroupChat"
    },
    {
      path:"join-room",
      component:JoinRoomComponent,
      title:"JoinRoom | GroupChat"
    },
    {
      path:"chat",
      component:ChatComponent,
      title:"Chat | GroupChat",
      
    },
    {
      path: "edituser",
      component: EdituserComponent,
      title:"Edit User | Admin"

    }]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
