import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromAuthActions from './auth.actions';
import { pipe } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
    constructor(private actions$: Actions, private router: Router) { }

    @Effect()
    authSignIn = this.actions$
        .pipe(
            ofType(fromAuthActions.SIGN_IN),
            map(() => {
                return {
                    type: fromAuthActions.NAVIGATE_AFTER_SUCCESSFUL_SIGNING_IN,
                    payload: '/'
                };
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
}