import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import * as fromApp from './../store/app.reducers';
import * as fromAuthActions from './../auth/store/auth.actions';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';
import { BASE_URL_TOKEN } from '../app.config';
import { Unsubscriber } from '../shared/unsubscriber';
import { getClientId } from '../auth/store/auth.selectors';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends Unsubscriber implements OnInit, OnDestroy {
  private clientId: string;

  constructor(
    private location: Location,
    private store: Store<fromApp.State>,
    private route: ActivatedRoute,
    @Inject(BASE_URL_TOKEN) private baseUrl: string
  ) {
    super();
  }

  signIn(): void {
    window.location.href = `https://api.instagram.com/oauth/authorize/?client_id=${this.clientId}&redirect_uri=${this.baseUrl}${this.location.path()}&response_type=token`;
  }

  ngOnInit(): void {
    this.store.select(getClientId)
      .pipe(
        takeUntil(this.subscriptionController$$)
      )
      .subscribe((clientId: string): void => {
        this.clientId = clientId;
      });

    this.route.fragment
      .pipe(
        takeUntil(this.subscriptionController$$)
      )
      .subscribe((routeFragment: string): void => {
        if (routeFragment.indexOf('access_token=') === 0) {
          const accessToken: string = routeFragment.slice('access_token='.length);

          this.store.dispatch(new fromAuthActions.SignIn(accessToken));
        }
      });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

}
