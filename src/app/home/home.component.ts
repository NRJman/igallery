import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import * as fromApp from './../store/app.reducers';
import * as fromAuth from './../auth/store/auth.reducer';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';
import { BASE_URL_TOKEN } from '../app.config';
import { Unsubscriber } from '../shared/unsubscriber';
import { getClientId } from '../auth/store/auth.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends Unsubscriber implements OnInit, OnDestroy {
  private clientId$: Observable<string>;
  private clientId: string;

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
    this.clientId$ = this.store.select(getClientId);
    this.clientId$
    .pipe(
      takeUntil(this.subscriptionController$$)
    )
    .subscribe((clientId: string) => {
      this.clientId = clientId;
    });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

}
