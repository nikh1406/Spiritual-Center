import { Component, OnInit } from '@angular/core';
import { userList } from '../../../../models/backend';
import { CommonModule } from '@angular/common';
import { BackendDataService } from '../../../../Services/backend-data.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../States/app.state';
import { getByIdUser } from '../../../States/DevoteeList/userlist.actions';
import { getUserById } from '../../../States/DevoteeList/userlist.selector';
import { setloadingspinner } from '../../../../States/LoaderState/loader.action';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  userData: userList[] = []
  photoUrl: string = ""
  constructor(protected backend: BackendDataService, private store: Store<AppState>) {
    this.store.select(getUserById).subscribe((d: userList[] | null) => {
      if (d?.length == 0) {
        this.store.dispatch(setloadingspinner({status:true}))
        const user = this.backend.getuserFromLocalStorage()
        this.store.dispatch(getByIdUser({ id: user?.id! }))
        this.store.dispatch(setloadingspinner({status:true}))
      }
    })
  }

  ngOnInit(): void {

    this.store.select(getUserById).subscribe((d: userList[] | null) => {
      this.userData = d!
      this.photoUrl = this.backend.imgUrl+d![0].photo
      this.store.dispatch(setloadingspinner({status:false}))
    })

  }
}
