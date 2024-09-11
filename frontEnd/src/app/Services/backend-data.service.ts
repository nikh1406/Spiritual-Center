import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { Header, Login, loginResponse, payment, userList } from '../models/backend';
import { environment } from '../../environments/environment.development';
import { Store } from '@ngrx/store';
import { AppState } from '../States/app.state';
import { autologout } from '../States/LoginState/login.action';
import CryptoJS from 'crypto-js';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class BackendDataService {

  imgUrl: string = environment.imgUrl;
  apiUrl: string = environment.apiUrl;
  SecretKey: string = environment.SecretKey;
  timeoutInterval: any


  constructor(private http: HttpClient, private store: Store<AppState>,@Inject(PLATFORM_ID) private platformId:object) {
    // console.log(sessionStorage.getItem("loginTocken"));
  }

  get getHeaderContent() {
    if (localStorage.getItem("userData")) {

      let token: string = this.getToken();
      let option: Header = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }

      }
      return option
    }
    return
  }


  getuserList(): Observable<userList[]> {
    return this.http.get<userList[]>(this.apiUrl + "Users")
  }
  getuserListById(id:string): Observable<userList> {
    return this.http.get<userList>(this.apiUrl + `Users/${id}`,this.getHeaderContent)
  }
  postUserData(data: userList): Observable<userList> {
    return this.http.post<userList>(this.apiUrl + "Users", data, this.getHeaderContent)
  }
  updateUserData(id: string, data: userList): Observable<userList> {
    return this.http.put<userList>(this.apiUrl + "Users/" + id, data, this.getHeaderContent)
  }
  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(this.apiUrl + "Users/" + id, this.getHeaderContent)
  }
  getUserBypagination(page: number, pagesize: number): Observable<userList[]> {
    return this.http.get<userList[]>(this.apiUrl + `Users/pagination?page=${page}&pagesize=${pagesize}`)
  }
  // }Users/pagination?page=2&pagesize=3

  getLoginToken(data: Login): Observable<loginResponse> {
    return this.http.post<loginResponse>(this.apiUrl + "Login", data)
  }



  getPaymentData(): Observable<payment[]> {
    return this.http.get<payment[]>(this.apiUrl + "Payments", this.getHeaderContent)
  }
  getPaymentDataById(id:string): Observable<payment[]> {
    return this.http.get<payment[]>(this.apiUrl + `Payments/${id}`, this.getHeaderContent)
  }

  postPymentData(data: payment): Observable<payment> {
    return this.http.post<payment>(this.apiUrl + "Payments", data, this.getHeaderContent)
  }
  updatePayment(id: string, data: payment): Observable<any> {
    return this.http.put<any>(this.apiUrl + "Payments/" + id, data, this.getHeaderContent)
  }
  getUnpaidUserDetial(): Observable<userList[]> {
    return this.http.get<userList[]>(this.apiUrl + "Payments/Unpaid Detail", this.getHeaderContent)
  }



  uploadPhoto(id: string, data: FormData): Observable<{ message: string, filename: string }> {
    return this.http.post<{ message: string, filename: string }>(this.apiUrl + 'Image/' + id, data)
  }


  setUserInLocalStorage(loginResponse: loginResponse) {
    if(isPlatformBrowser(this.platformId)){
      const response: loginResponse = {
        ...loginResponse,
        token: CryptoJS.AES.encrypt(loginResponse.token!, this.SecretKey).toString(),
      }
      localStorage.setItem("userData", JSON.stringify(response));
      this.runTimeOutInterval(response);
    }
    
  }

  runTimeOutInterval(user: loginResponse) {
    const todaysData = new Date().getTime();
    const expirationDate = new Date(user.expiration).getTime();
    const timeInterval = expirationDate - todaysData
    this.timeoutInterval = setTimeout(() => {
      this.store.dispatch(autologout())
    }, timeInterval);

  }


  getuserFromLocalStorage() {
    if(isPlatformBrowser(this.platformId)){
      if (localStorage.getItem("userData")) {
        const user: loginResponse = JSON.parse(localStorage.getItem("userData")!);
        const response: loginResponse = {
          ...user,
          token: CryptoJS.AES.decrypt(user.token, this.SecretKey).toString(CryptoJS.enc.Utf8)
        }
        this.runTimeOutInterval(response)
        return response;
      }
      return null
    }
    return null
  }


  getToken() {
    const data = this.getuserFromLocalStorage();
    return data?.token!
  }

  logOut() {
    localStorage.removeItem('userData');
    if (this.timeoutInterval) {
      clearTimeout(this.timeoutInterval);
      this.timeoutInterval = null;
    }

  }
}
       