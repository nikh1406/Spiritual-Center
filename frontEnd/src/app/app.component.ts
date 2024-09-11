import { AfterContentInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './States/app.state';
import { getLoading } from './States/LoaderState/loader.selector';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { autologin, loginSuccess } from './States/LoginState/login.action';
import { BackendDataService } from './Services/backend-data.service';
import { getcurrentRouteData } from './States/RoutersState/router.selector';
import { ROUTER_NAVIGATED, ROUTER_NAVIGATION } from '@ngrx/router-store';
import { NgZone } from '@angular/core';
import { setloadingspinner } from './States/LoaderState/loader.action';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadingSpinnerComponent, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'FullStack';

  shaowloading$: Observable<boolean> | undefined;
  // showLoading:boolean = false


  constructor(private store: Store<AppState>, private backendService: BackendDataService, private cdRef: ChangeDetectorRef) { }


  ngOnInit(): void {

    this.shaowloading$ = this.store.select(getLoading);                                                                  
    if (this.backendService.getuserFromLocalStorage()!) {
      this.store.dispatch(autologin());
    }

                                         
  }

  // ngOnDestroy(): void {
  //   this.store.dispatch(setloadingspinner({status:false}))
  // }

      
}
