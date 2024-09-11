import { ApplicationConfig, importProvidersFrom, inject, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { appReducer } from './States/app.state';
import { UserListEffects } from './modules/States/DevoteeList/userlist.effects';
import { LoginEffects } from './States/LoginState/login.effects';
import { CustomSerializer } from './States/RoutersState/custom-serializer';
import { PaymentsEffects } from './modules/States/payment/payments.effects';
import { provideClientHydration } from '@angular/platform-browser';
import { BackendDataService } from './Services/backend-data.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(withFetch()), provideToastr({
    timeOut: 500,
    positionClass: 'toast-bottom-center',
    preventDuplicates: true,
  }), 
  // importProvidersFrom(
  //   JwtModule.forRoot({
  //       config: {
  //           tokenGetter: tokenGetter,
  //           // allowedDomains: ["example.com"],
  //           // disallowedRoutes: ["http://example.com/examplebadroute/"],
  //       },
  //   })
  // ),
  provideAnimationsAsync('noop'), 
  provideAnimations(), 

  provideStore(appReducer), 
  provideEffects([UserListEffects,LoginEffects,PaymentsEffects]), 
  provideRouterStore(
    {
      serializer: CustomSerializer
    }
  ), 
  provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }), provideClientHydration()]
};

// export function tokenGetter() {
//   const service = inject(BackendDataService);
//   let user = service.getuserFromLocalStorage()!;
//   if(user['token']){
//     return user['token'];
//   }
//   return ""
// }