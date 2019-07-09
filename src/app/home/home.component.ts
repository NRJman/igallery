import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as fromApp from './../store/app.reducers';
import * as fromAuth from './../auth/store/auth.reducer';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private authState: Observable<fromAuth.State>;
  private clientId: string;
  private authStateSubscription: Subscription;

  constructor(private location: Location, private store: Store<fromApp.State>) { }

  signIn(): void {
    window.location.href = `https://api.instagram.com/oauth/authorize/?client_id=${this.clientId}&redirect_uri=${this.location.path()}&response_type=token`;
  }

  ngOnInit(): void {
    this.authState = this.store.select('auth');
    this.authStateSubscription = this.authState.subscribe((authState: fromAuth.State) => {
      this.clientId = authState.clientId;
    });
  }

  ngOnDestroy(): void {
    this.authStateSubscription.unsubscribe();
  }

}
