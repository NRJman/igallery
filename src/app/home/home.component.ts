import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import * as fromApp from './../store/app.reducers';
import * as fromAuth from './../auth/store/auth.reducer';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';
import { BASE_URL_TOKEN } from '../app.config';
import { Unsubscriber } from '../shared/unsubscriber';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends Unsubscriber implements OnInit, OnDestroy {
  private authState$: Observable<fromAuth.State>;
  private clientId: string;
  private authStateSubscription: Subscription;

  constructor(
    private location: Location,
    private store: Store<fromApp.State>,
    @Inject(BASE_URL_TOKEN) private baseUrl: string
  ) {
    super();
  }

  signIn(): void {
    window.location.href = `https://api.instagram.com/oauth/authorize/?client_id=${this.clientId}&redirect_uri=${this.baseUrl}${this.location.path()}&response_type=token`;
  }

  ngOnInit(): void {
    this.authState$ = this.store.select('auth');
    this.authStateSubscription = this.authState$
    .pipe(
      takeUntil(this.subscriptionController$$)
    )
    .subscribe((authState: fromAuth.State) => {
      this.clientId = authState.clientId;
    });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

}
