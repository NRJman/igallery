import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import * as AppState from './store/app.reducers';
import { Store } from '@ngrx/store';
import * as AuthActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'igallery';

  constructor(private authService: AuthService, private store: Store<AppState.State>) { }

  ngOnInit(): void {
    const accessToken = this.authService.getUserAccessToken();

    if (accessToken) {
      this.store.dispatch(AuthActions.resetState({
        newState: {
          accessToken,
          isAuthenticated: true
        }
      }));
    }
  }
}
