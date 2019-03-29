import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule
  ],
  exports: [ CalendarModule ]
})
export class CalendarModule { }
