import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

// import { DevoteeComponent } from './components/devotee/devotee.component';
// import { MypaymentsComponent } from './components/mypayments/mypayments.component';
// import { PayonlineComponent } from './components/payonline/payonline.component';
// import { ProfileComponent } from './components/profile/profile.component';
import { adminGuard } from './guard/guard/admin.guard';
import { devoteeGuard } from './guard/guard/devotee.guard';

import { isLoginGuard } from './guard/guard/is-login.guard';


export const routes: Routes = [
    {
        path:"login",
        component:LoginComponent,
        canActivate:[isLoginGuard]
    },
    {
        path:"admin",
        canActivate:[adminGuard],
        title:"Admin | SpiritualCentre",
        loadChildren:()=> import ("./modules/admin/admin.module").then(a => a.AdminModule)
    },
    {   
        path:"devotee",
        canActivate:[devoteeGuard],
        title:"Devotee | SpiritualCentre",
        loadChildren:() => import("./modules/devotee/devotee.module").then(d => d.DevoteeModule)
    },
    {
        path:"",
        redirectTo:"login",
        pathMatch:"full"
    },
    
    {
        path:"**",
        component:PageNotFoundComponent
    },
];
