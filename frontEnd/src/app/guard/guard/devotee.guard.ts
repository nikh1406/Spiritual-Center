import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { BackendDataService } from '../../Services/backend-data.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../States/app.state';
import { loginUserDetail } from '../../States/LoginState/login.selector';
import { map, tap } from 'rxjs';

export const devoteeGuard: CanActivateFn = (route, state) => {
  const routes = inject(Router);
  const backendService = inject(BackendDataService);
  if (backendService.getuserFromLocalStorage!) {
    const user = backendService.getuserFromLocalStorage()
    
    if (user!['role'] == "Devotee" && user!['token']) {
      return true;
    }
    else {
      routes.navigate(['/login']);
      return false
    }
  }
  routes.navigate(['/login']);
  return false


  // const routes = inject(Router);
  // const backendService = inject(BackendDataService);
  // if (backendService.getuserFromLocalStorage!) {
  //   const user = backendService.getuserFromLocalStorage()
  //   if(jwtDecode(user!['token'])){
      
  //     const tokenVerify:any = jwtDecode(user!['token']);
  //     const role = tokenVerify['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
  //     if (role == "Devotee" && user!['token']) {
  //       return true;
  //     }
  //     else {
  //       routes.navigate(['/login']);
  //       return false
  //     }
  //   }
  // }
  // routes.navigate(['/login']);
  // return false
};
