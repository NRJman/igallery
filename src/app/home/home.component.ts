import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import * as fromApp from './../store/app.reducers';
import * as fromAuthActions from './../auth/store/auth.actions';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';
import * as fromAppConfig from '../app.config';
import { Unsubscriber } from '../shared/unsubscriber';
import { getAccessToken } from '../auth/store/auth.selectors';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends Unsubscriber implements OnInit, OnDestroy {
  private accessToken: string;

  constructor(
    private location: Location,
    private store: Store<fromApp.State>,
    private route: ActivatedRoute,
    @Inject(fromAppConfig.APP_BASE_URL_TOKEN) private baseUrl: string,
    @Inject(fromAppConfig.CLIENT_ID_TOKEN) private clientId: string,
    @Inject(fromAppConfig.INSTAGRAM_API_BASE_URL_TOKEN) private instagramBaseUrl: string
  ) {
    super();
  }

  signIn(): void {
    window.location.href = `${this.instagramBaseUrl}oauth/authorize/?client_id=${this.clientId}&redirect_uri=${this.baseUrl}`
      + `${this.location.path()}&response_type=token`;
  }

  ngOnInit(): void {
    this.store.select(getAccessToken) // possibly will be removed in future
      .pipe(
        takeUntil(this.subscriptionController$$)
      )
      .subscribe((accessToken: string) => {
        if (accessToken !== null) {
          this.accessToken = accessToken;
          console.log(this.accessToken);
        }
      });

    this.route.fragment
      .pipe(
        takeUntil(this.subscriptionController$$)
      )
      .subscribe((routeFragment: string): void => {
        if (routeFragment === null) {
          return;
        }

        const accessToken: string = routeFragment.slice('access_token='.length);

        this.store.dispatch(new fromAuthActions.SignIn(accessToken));
      });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

}
