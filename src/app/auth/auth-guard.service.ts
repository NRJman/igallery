import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AppState from './../store/app.reducers';
import { getIsAuthenticated } from './store/auth.selectors';
import { map, take } from 'rxjs/operators';
import * as AppConfig from './../app.config';
import { Location } from '@angular/common';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(
        private store: Store<AppState.State>,
        @Inject(AppConfig.APP_BASE_URL_TOKEN) private baseUrl: string,
        @Inject(AppConfig.CLIENT_ID_TOKEN) private clientId: string,
        @Inject(AppConfig.INSTAGRAM_API_BASE_URL_TOKEN) private instagramBaseUrl: string
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<boolean> | Observable<boolean> | boolean {
        return this.store.select(getIsAuthenticated)
            .pipe(
                map((isAuthenticated: boolean) => {
                    if (!isAuthenticated) {
                        window.location.href = // currently looking for another method of external redirect
                        `${this.instagramBaseUrl}oauth/authorize/?client_id=${this.clientId}&redirect_uri=${this.baseUrl}` +
                        `${state.url}&response_type=token`;
                    }

                    return isAuthenticated;
                }),
                take(1)
            );
    }
}
