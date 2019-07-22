import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromAuthActions from './auth.actions';
import { tap, map, withLatestFrom } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducers';
import { getAccessToken } from './auth.selectors';

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private router: Router,
        private cookieService: CookieService,
        private store$: Store<fromApp.State>
    ) { }

    @Effect()
    authSignIn = this.actions$
        .pipe(
            ofType(fromAuthActions.SIGN_IN),
            withLatestFrom(this.store$.select(getAccessToken)),
            map(([, accessToken]: [fromAuthActions.SignIn, string]) => {
                return [
                    {
                        type: fromAuthActions.SAVE_AUTHORIZATION_DATA,
                        payload: accessToken
                    },
                    {
                        type: fromAuthActions.NAVIGATE_AFTER_SUCCESSFUL_SIGNING_IN,
                        payload: '/'
                    }
                ];
            })
        );

    @Effect({ dispatch: false })
    authNavigate = this.actions$
        .pipe(
            ofType(fromAuthActions.NAVIGATE_AFTER_SUCCESSFUL_SIGNING_IN),
            map((action: fromAuthActions.NavigateAfterSuccessfulSigningIn): string => action.payload),
            tap((path) => {
                this.router.navigate([path], {
                    fragment: null
                });
            })
        );

    @Effect({ dispatch: false })
    saveAuthorizationData = this.actions$
        .pipe(
            ofType(fromAuthActions.SAVE_AUTHORIZATION_DATA),
            map((action: fromAuthActions.SaveAuthorizationData): string => action.payload),
            tap((accessToken: string) => {
                this.cookieService.set('accessToken', accessToken);
            })
        );
}
