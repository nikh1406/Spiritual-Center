import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { pincodeValidator } from '../../../../Custom-validator/pincode';
import { dateValidator } from '../../../../Custom-validator/initiationDateErr';
import { CommonModule, formatDate } from '@angular/common';
import { userList } from '../../../../models/backend';
import { BackendDataService } from '../../../../Services/backend-data.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../States/app.state';
import { photoupload, updateuser } from '../../../States/DevoteeList/userlist.actions';
import { setloadingspinner } from '../../../../States/LoaderState/loader.action';

@Component({
  selector: 'app-edituser',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './edituser.component.html',
  styleUrl: './edituser.component.css'
})
export class EdituserComponent implements OnInit, OnDestroy {

  photoUrl: string = ""
  updateData: userList[] = []
  closePhotoBtn: boolean = true
  selecteFile: File | undefined;
  currentDate: Date | undefined;
  constructor(private store: Store<AppState>, private backendService: BackendDataService, private routes: Router, private tostr: ToastrService) {

    this.currentDate = new Date()
    this.photoUrl = this.backendService.imgUrl
    this.closePhotoBtn = true
    this.updateData.push(JSON.parse(sessionStorage.getItem("EditUserData")!))

    const data = JSON.parse(sessionStorage.getItem("EditUserData")!)

    this.firstnameController.setValue(data.firstName)
    this.middleNameController.setValue(data.middleName)
    this.lastNameController.setValue(data.lastName)
    this.flatNumberController.setValue(data.flatNumber)
    this.areaController.setValue(data.area)
    this.cityController.setValue(data.city)
    this.stateController.setValue(data.state)
    this.pincodeeController.setValue(data.pincode)
    this.emailidController.setValue(data.emailid)
    this.initiationDateController.setValue(formatDate(data.initiationDate, 'yyyy-MM-dd', 'en'))

    this.store.dispatch(setloadingspinner({ status: false }))

  }

  ngOnInit(): void {

  }
  createuserForm:FormGroup = new FormGroup({

    devoteeId: new FormControl(""),
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
    initiationDate: new FormControl("", [Validators.required]),
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

  userUpdate() {
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
      newData.devoteeId = this.updateData[0].devoteeId
      newData.firstName = this.firstnameController.value
      newData.middleName = this.middleNameController.value
      newData.lastName = this.lastNameController.value
      newData.flatNumber = this.flatNumberController.value
      newData.area = this.areaController.value
      newData.state = this.stateController.value
      newData.city = this.cityController.value
      newData.pincode = this.pincodeeController.value
      newData.emailid = this.emailidController.value
      newData.initiationDate = this.initiationDateController.value

      console.log(this.photoController.value);

      if (this.photoController.value != "") {
        newData.photo = this.photoController.value
      }   
      this.store.dispatch(setloadingspinner({ status: true }))
      debugger
      this.store.dispatch(updateuser({ user: newData, photoFile:this.selecteFile!}))
    }
  }





  onFIleSelected($event: Event) {
    const input = event!.target as HTMLInputElement;
    if (input.files?.length! > 0) {
      this.selecteFile = input.files![0];
    }
  }
  closeBtn() {
    this.closePhotoBtn = false
  }

  ngOnDestroy(): void {
    this.store.dispatch(setloadingspinner({ status: false }))
  }
}
