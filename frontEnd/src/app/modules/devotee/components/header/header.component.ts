import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BackendDataService } from '../../../../Services/backend-data.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../States/app.state';
import { autologout } from '../../../../States/LoginState/login.action';

@Component({
  selector: 'app-header-devotee',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  username: string = ""
  img: string = ""
  constructor(protected backend: BackendDataService,private store:Store<AppState>) {


    if (backend.getuserFromLocalStorage()!) {
      const user = backend.getuserFromLocalStorage()
      this.username = user!['name']
      this.img = this.backend.imgUrl + user!['img']
    }
  }


  logout(event:Event){
    this.store.dispatch(autologout())
  }
}
