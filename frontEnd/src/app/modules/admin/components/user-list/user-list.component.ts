import { Component, OnDestroy, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BackendDataService } from '../../../../Services/backend-data.service';
import { userList } from '../../../../models/backend';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../States/app.state';
import { setloadingspinner } from '../../../../States/LoaderState/loader.action';
import { deleteUser, loadUser } from '../../../States/DevoteeList/userlist.actions';
import { getUser } from '../../../States/DevoteeList/userlist.selector';
import { getLoading } from '../../../../States/LoaderState/loader.selector';
import { Observable } from 'rxjs';
import { LoadingSpinnerComponent } from '../../../../components/loading-spinner/loading-spinner.component';
                        

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit, OnDestroy {                                      


  filterData() {
    throw new Error('Method not implemented.');
  }

  PhotoURl: string = ""
  mockData: userList[] = []
  UserList: userList[] = []
  loader: boolean = true

  p: any = 1
  config: any = {
    id: 'basicPaginate',
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: this.UserList.length
  }


  inputVal = new FormGroup({
    val: new FormControl("")
  })
                                                                                             
  get serchvalController() {         
    return this.inputVal.get("val") as FormControl
  }
  sortByDesc() {
    this.UserList = this.UserList.sort((a, b) => b.firstName.localeCompare(a.firstName))                                                                                  
  }
  sortByAsc() {
    this.UserList = this.UserList.sort((a, b) => a.firstName.localeCompare(b.firstName))
  }

  constructor(private store: Store<AppState>, protected backendService: BackendDataService, private route: Router) {
    this.PhotoURl = this.backendService.imgUrl
    this.config = {
      id: 'basicPaginate',                                                                                                                                                          
      itemsPerPage: 2,
      currentPage: 1,
      totalItems: this.UserList.length
    }
  }       


  ngOnInit(): void {
    this.store.dispatch(loadUser());
    this.store.select(getUser).subscribe((data) => {
      this.UserList = data
      this.mockData = data    
      this.loader = false
    })


    this.serchvalController.valueChanges.subscribe((data) => {
      this.p = 1
      this.UserList = this.mockData.filter((d) => d.firstName.toLowerCase().includes(data.toLowerCase()) || d.lastName.toLowerCase().includes(this.serchvalController.value.toLowerCase()) || d.area.toLowerCase().includes(this.serchvalController.value.toLowerCase()) || d.city.toLowerCase().includes(this.serchvalController.value.toLowerCase()) || d.pincode.toLowerCase().includes(this.serchvalController.value.toLowerCase()))
    })
  }


  editUser(editdata: userList) {   
    this.store.dispatch(setloadingspinner({ status: true }))
    sessionStorage.setItem("EditUserData", JSON.stringify(editdata))
    this.route.navigate(['/admin/edituser'])              
  }

  deleteUser(id: string) {
    this.store.dispatch(deleteUser({ id }))
  }

                                        

  ngOnDestroy(): void {

  }
}
