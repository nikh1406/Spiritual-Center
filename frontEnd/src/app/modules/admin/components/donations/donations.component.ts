import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxPaginationModule } from 'ngx-pagination';
import { payment, userList } from '../../../../models/backend';
import { BackendDataService } from '../../../../Services/backend-data.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../States/app.state';
import { loadpayment } from '../../../States/payment/payment.action';
import { getPayments } from '../../../States/payment/payment.selector';
import { unpaidUserAction } from '../../../States/DevoteeList/userlist.actions';
import { getUnpaidData } from '../../../States/DevoteeList/userlist.selector';
import * as CryptoJS from 'crypto-js';  
@Component({
  selector: 'app-donations',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, NgxPaginationModule],
  templateUrl: './donations.component.html',
  styleUrl: './donations.component.css'
})
export class DonationsComponent implements OnInit {
  p: any = 1
  userPaymentList: payment[] = []
  UserList: userList[] = []
  paymentCategoryFrom = new FormGroup({
    paymentCategory: new FormControl("allpayment"),

  })

  get paymentCategoryController() {
    return this.paymentCategoryFrom.get("paymentCategory") as FormControl
  }

  constructor(private backend: BackendDataService, private store: Store<AppState>) { }
  ngOnInit(): void {
    this.store.dispatch(loadpayment());
    this.store.select(getPayments).subscribe((data) => {
      this.userPaymentList = data
    })

    this.paymentCategoryController.valueChanges.subscribe((d) => {
      this.p = 1
      if (this.paymentCategoryController.value == 'unpaid') {

        this.store.dispatch(unpaidUserAction());
        this.store.select(getUnpaidData).subscribe((d) => {
          this.UserList = d
        })
      }
    })


    
  }

}

