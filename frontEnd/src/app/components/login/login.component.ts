import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BackendDataService } from '../../Services/backend-data.service';
import { Login } from '../../models/backend';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { AppState } from '../../States/app.state';
import { loginStart } from '../../States/LoginState/login.action';
import { setloadingspinner } from '../../States/LoaderState/loader.action';
import { getFlag } from '../../States/LoginState/login.selector';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  {

  isvalidCredential: boolean = true
  otpView: boolean = false
  constructor(private store: Store<AppState>, private backendService: BackendDataService, private routes: Router, private tostr: ToastrService) { }

  loginForm: FormGroup = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    role: new FormControl("", Validators.required),
    otp: new FormControl("", Validators.required)
  })

  get usernameController() {
    return this.loginForm.get("username") as FormControl
  }
  get passwordController() {
    return this.loginForm.get("password") as FormControl
  }
  get roleController() {
    return this.loginForm.get("role") as FormControl
  }
  get otpController() {
    return this.loginForm.get("otp") as FormControl
  }



  login() {
    if (this.loginForm.invalid) {
      this.roleController.markAsTouched();
      this.usernameController.markAsTouched();
      this.passwordController.markAsTouched();
      console.log(this.otpView)
      if(this.otpView){
        this.otpController.markAsTouched();
      }
    }
    if (this.roleController.value == 'Admin' || this.roleController.value == 'Devotee') {
      this.store.dispatch(setloadingspinner({ status: true }))
      if (this.usernameController.value == 'admin' && this.passwordController.value == 'admin') {
        this.otpController.setValue("000000");
      }
      this.store.dispatch(loginStart({ id: this.usernameController.value, role: this.roleController.value, password: this.passwordController.value, otp: this.otpController.value }))
      this.store.select(getFlag).subscribe((d) => {
        this.isvalidCredential = d?.isvalidCredential!,
          this.otpView = d?.otpView!
      })
    }
  }

}

