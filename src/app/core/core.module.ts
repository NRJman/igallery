import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BASE_URL_TOKEN, BASE_URL } from '../app.config';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {provide: BASE_URL_TOKEN, useValue: BASE_URL}
  ]
})
export class CoreModule { }
