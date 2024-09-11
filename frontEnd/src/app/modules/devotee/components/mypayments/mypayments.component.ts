import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { BackendDataService } from '../../../../Services/backend-data.service';
import { payment } from '../../../../models/backend';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../States/app.state';
import { loadpayment, loadpaymentById } from '../../../States/payment/payment.action';
import { getPayments, getPaymentsById } from '../../../States/payment/payment.selector';
import { setloadingspinner } from '../../../../States/LoaderState/loader.action';

@Component({
  selector: 'app-mypayments',
  standalone: true,
  imports: [FormsModule, NgxPaginationModule, CommonModule],
  templateUrl: './mypayments.component.html',
  styleUrl: './mypayments.component.css'
})
export class MypaymentsComponent implements OnInit {
  p: any = 1
  userPaymentList: payment[] = []
  constructor(private backend: BackendDataService, private store: Store<AppState>) {
    // this.store.select(getPaymentsById).subscribe((d)=>{
    //   if (d?.length == 0) {
    //     // this.store.dispatch(setloadingspinner({status:true}))
    //     const user = this.backend.getuserFromLocalStorage()
    //     this.store.dispatch(loadpaymentById({id:user?.id!}))
    //   }
    // })
    const user = this.backend.getuserFromLocalStorage()
    this.store.dispatch(loadpaymentById({ id: user?.id! }))
  }
  ngOnInit(): void {
    this.store.select(getPaymentsById).subscribe((d) => {
      this.userPaymentList = d!
      // this.store.dispatch(setloadingspinner({status:false}))
    })

  }





}
