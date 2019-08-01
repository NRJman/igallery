import { Component, OnInit } from '@angular/core';
import * as AppState from './store/app.reducers';
import { Store } from '@ngrx/store';
import * as fromAuthActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'igallery';

  constructor(private store: Store<AppState.State>) { }

  ngOnInit(): void {
    this.store.dispatch(fromAuthActions.fetchAuthorizationData());
  }
}
