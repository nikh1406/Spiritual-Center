import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendDataService } from '../../../../Services/backend-data.service';
import { payment } from '../../../../models/backend';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../States/app.state';
import { addpayment } from '../../../States/payment/payment.action';

@Component({
  selector: 'app-payonline',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './payonline.component.html',
  styleUrl: './payonline.component.css'
})
export class PayonlineComponent {

  constructor(private routes:Router,private backendService:BackendDataService,private store:Store<AppState>){}
  valueForm = new FormGroup({
    month:new FormControl("",[Validators.required]),
    year:new FormControl("",Validators.required),
    amount:new FormControl('',Validators.required)
  })

  get monthController(){
    return this.valueForm.get("month") as FormControl
  }

  get yearController(){
    return this.valueForm.get("year") as FormControl
  }
  get amountController(){
    return this.valueForm.get("amount") as FormControl
  }


  paymentDetail(){
    if(this.valueForm.valid){
      let data:payment[] = []
      let userId:any
      

      // this.backendService.getPaymentData().subscribe((d)=>{
      //   data = d.filter((d)=> d.devoteeId == userId && +(d.month) == +(this.monthController.value) && +(d.year) == +(this.yearController.value));
      //   if(sessionStorage.getItem("userID")!){
      //     userId = sessionStorage.getItem("userID")!
      //   }
      //   if(data.length != 0){
      //     data[0].amount = ((data[0].amount) + (this.amountController.value))
      //     console.log(data);
          
      //     this.backendService.updatePayment(userId as string,data[0]).subscribe((d)=>{
      //       console.log(d);
            
      //     })
          
      //   }
      //   else{

          
      //   }

      //   console.log(this.amountController.value + data[0].amount);
      // })
      
      if(localStorage.getItem("userData")){
        const user = this.backendService.getuserFromLocalStorage();
        const paymentData:payment = {
          paymentId: 0,
          devoteeId: user!['id'],
          month: this.monthController.value,
          year: this.yearController.value,
          amount: this.amountController.value,
          paymentMethod: 'Online'
        }
        this.store.dispatch(addpayment({payment:paymentData}))
      }
    }
    else{
      this.valueForm.markAllAsTouched()
    }
  }
}
