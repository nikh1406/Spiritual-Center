import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MypaymentsComponent } from './components/mypayments/mypayments.component';
import { PayonlineComponent } from './components/payonline/payonline.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { devoteeGuard } from '../../guard/guard/devotee.guard';
import { ChatComponent } from './components/groupChat/chat/chat.component';
import { JoinRoomComponent } from './components/groupChat/join-room/join-room.component';
import { WelcomeComponent } from './components/groupChat/welcome/welcome.component';

const routes: Routes = [
  {
    path:"",
    title:"Devotee-Home | SpiritualCentre",
    component: HomeComponent,
    canActivateChild:[devoteeGuard],
    children:[
      {
          path:"mypayments",
          title:"MyPayments | Devotee",
          component:MypaymentsComponent
      },{
          path:"payonline",
          title:"PayOnline | Devotee",
          component:PayonlineComponent
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
        title:"Chat | GroupChat"
      },{
          path:"profile",
          title:"Profile | Devotee",
          component:ProfileComponent
      }],
  
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevoteeRoutingModule { }
