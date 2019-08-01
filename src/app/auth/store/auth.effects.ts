import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import * as fromAuthActions from './auth.actions';
import { tap, map, withLatestFrom, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Store, Action } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducers';
import { getAccessToken } from './auth.selectors';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private router: Router,
        private cookieService: CookieService,
        private store$: Store<fromApp.State>
    ) { }

    authSignIn$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromAuthActions.signIn),
            withLatestFrom(this.store$.select(getAccessToken)),
            switchMap(([, accessToken]: [Action, string]) => {
                return [
                    fromAuthActions.saveAuthorizationData({ accessToken }),
                    fromAuthActions.navigateAfterSuccessfulSigningIn({ path: '/' })
                ];
            })
        )
    );

    authNavigate$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromAuthActions.navigateAfterSuccessfulSigningIn),
            map(action => action.path),
            tap((path) => {
                this.router.navigate([path], {
                    fragment: null
                });
            })
        ),
        { dispatch: false }
    );

    saveAuthorizationData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromAuthActions.saveAuthorizationData),
            map(action => action.accessToken),
            tap((accessToken: string) => {
                this.cookieService.set('accessToken', accessToken);
            })
        ),
        { dispatch: false }
    );

    fetchAuthorizationData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromAuthActions.fetchAuthorizationData),
            map(() => {
                let isAuthenticated = false;
                const accessToken: string = this.cookieService.get('accessToken');

                if (accessToken) {
                    isAuthenticated = true;

                    return fromAuthActions.resetState({ newState: { accessToken, isAuthenticated } });
                }

                return fromAuthActions.resetState({ newState: { accessToken: null, isAuthenticated } });
            })
        )
    );
}
