import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendDataService } from '../../../../Services/backend-data.service';
import { pincodeValidator } from '../../../../Custom-validator/pincode';
import { dateValidator } from '../../../../Custom-validator/initiationDateErr';
import { userList } from '../../../../models/backend';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../States/app.state';
import { adduser } from '../../../States/DevoteeList/userlist.actions';
import { setloadingspinner } from '../../../../States/LoaderState/loader.action';


@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css'
})
export class UserCreateComponent {

  selecteFile: File | undefined;
  currentDate: Date | undefined;
  constructor(private backendService: BackendDataService, private routes: Router, private tostr: ToastrService, private store: Store<AppState>) {
    this.currentDate = new Date();
  }
  createuserForm: FormGroup = new FormGroup({
    firstName: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    middleName: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    lastName: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    photo: new FormControl(""),
    flatNumber: new FormControl("", [Validators.required]),
    area: new FormControl("", [Validators.required]),
    city: new FormControl("", [Validators.required]),
    state: new FormControl("", [Validators.required]),
    pincode: new FormControl("", [Validators.required, pincodeValidator(), Validators.maxLength(6)]),
    emailid: new FormControl("", [Validators.required, Validators.email]),
    initiationDate: new FormControl("", [Validators.required, dateValidator()]),
  })

  get firstnameController() {
    return this.createuserForm.get("firstName") as FormControl
  }
  get middleNameController() {
    return this.createuserForm.get("middleName") as FormControl
  }
  get lastNameController() {
    return this.createuserForm.get("lastName") as FormControl
  }
  get photoController() {
    return this.createuserForm.get("photo") as FormControl
  }
  get flatNumberController() {
    return this.createuserForm.get("flatNumber") as FormControl
  }
  get areaController() {
    return this.createuserForm.get("area") as FormControl
  }
  get cityController() {
    return this.createuserForm.get("city") as FormControl
  }
  get stateController() {
    return this.createuserForm.get("state") as FormControl
  }
  get pincodeeController() {
    return this.createuserForm.get("pincode") as FormControl
  }
  get emailidController() {
    return this.createuserForm.get("emailid") as FormControl
  }
  get initiationDateController() {
    return this.createuserForm.get("initiationDate") as FormControl
  }

  usercreate() {
    const newData: userList = {
      devoteeId: '',
      firstName: '',
      middleName: '',
      lastName: '',
      photo: '',
      flatNumber: 0,
      area: '',
      state: '',
      city: '',
      pincode: '',
      emailid: '',
      initiationDate: ""
    }
    if (this.createuserForm.valid) {
      // debugger
      newData.devoteeId = `${(new Date(this.initiationDateController.value).getFullYear())}-${(this.firstnameController.value as string).trim().substring(0, 2)}-${(this.lastNameController.value as string).trim().substring(0, 2)}-${(new Date(this.initiationDateController.value).getMonth() + 1)}`
      newData.firstName = this.firstnameController.value
      newData.middleName = this.middleNameController.value
      newData.lastName = this.lastNameController.value
      newData.photo = `${this.photoController.value}`
      newData.flatNumber = this.flatNumberController.value
      newData.area = this.areaController.value
      newData.state = this.stateController.value
      newData.city = this.cityController.value
      newData.pincode = this.pincodeeController.value
      newData.emailid = this.emailidController.value
      newData.initiationDate = this.initiationDateController.value

      this.store.dispatch(setloadingspinner({ status: true }))
      this.store.dispatch(adduser({ user: newData, photoFile: this.selecteFile! }))
    }
    else {
      this.createuserForm.markAllAsTouched();
    }
  }

  onFIleSelected($event: Event) {
    const input = event!.target as HTMLInputElement;
    if (input.files?.length! > 0) {
      this.selecteFile = input.files![0];

    }
  }
}
