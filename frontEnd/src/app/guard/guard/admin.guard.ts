import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { BackendDataService } from '../../Services/backend-data.service';
import { jwtDecode } from 'jwt-decode';

export const adminGuard: CanActivateFn = (route, state) => {

  const routes = inject(Router);
  const backendService = inject(BackendDataService);
  try {
    if (backendService.getuserFromLocalStorage()!) {
      const user = backendService.getuserFromLocalStorage()
      const tokenVerify: any = jwtDecode(user!['token']);
      if (tokenVerify['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] == "Admin" && user!['token'] && user!['id'] == "admin") {
        return true;
      } else {
        routes.navigate(['/login']);
        return false
      }
    }
  } catch (e) {
    debugger
    console.log("error : ", e);
    routes.navigate(['/']);
    debugger
    return false
  }
  return false

  // try {
    //   const user: loginResponse = JSON.parse(localStorage.getItem("userData")!);
    //   const response: loginResponse = {
    //     ...user,
    //     token: CryptoJS.AES.decrypt(user.token, backendService.SecretKey).toString(CryptoJS.enc.Utf8)
    //   }
  
    //   const tokenVerify: any = jwtDecode(response['token']);
    //   if (tokenVerify['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] == "Admin" && user!['token'] && user!['id'] == "admin") {
    //     return true;
    //   } else {
    //     routes.navigate(['/login']);
    //     return false
    //   }
    // } catch (e) {
    //   console.log("error : ", e);
    //   routes.navigate(['/']);
    //   return false
    // }



  // const routes = inject(Router);
  // const backendService = inject(BackendDataService);
  // if (backendService.getuserFromLocalStorage()!) {
  //   const user = backendService.getuserFromLocalStorage()
  //   const tokenVerify:any = jwtDecode(user!['token'])
  //   const role = tokenVerify['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']

  //   if (role === "Admin" && user!['token'] && user!['id'] == "admin") {
  //     return true;
  //   } else {
  //     console.log("Navigate to login");

  //     routes.navigate(['/login']);
  //     return false
  //   }
  // }
  // routes.navigate(['/login']);
  // return false   
};

