import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../States/app.state';
import { autologout } from '../../../../States/LoginState/login.action';
import { BackendDataService } from '../../../../Services/backend-data.service';
import { setloadingspinner } from '../../../../States/LoaderState/loader.action';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  username:string = ""
  constructor(private store:Store<AppState>,private backendService:BackendDataService){
    if (backendService.getuserFromLocalStorage()!) {
      const user = backendService.getuserFromLocalStorage()
      this.username = user!['id']
    }
  }

  logout(event:Event){
    this.store.dispatch(setloadingspinner({status:true}))
    this.store.dispatch(autologout())
  }


}
