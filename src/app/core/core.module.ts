import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BASE_URL_TOKEN, BASE_URL } from '../app.config';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../store/app.reducers';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers),
  ],
  exports: [
    StoreModule
  ],
  providers: [
    {provide: BASE_URL_TOKEN, useValue: BASE_URL}
  ]
})
export class CoreModule { }
