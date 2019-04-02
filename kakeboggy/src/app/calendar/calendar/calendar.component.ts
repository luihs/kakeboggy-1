import { Component, OnInit } from '@angular/core';  
import { animate, state, style, transition, trigger, animation} from   '@angular/animations'
import { formatDate } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';


import localeEs from '@angular/common/locales/es'

registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  animations:[
    trigger('detail expand', [
      state('collapsed', style ({ height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CalendarComponent implements OnInit {
  //declaracion de arrays
  nroDays = [30, 31, 28];

  //fecha actual
  today: number = Date.now();

  model: NgbDateStruct;
  date: {year: number, month: number};

  constructor(private calendar: NgbCalendar) { }

  selectToday() {
    this.model = this.calendar.getToday();
  }

  ngOnInit() {
    this.cuentaArray()
    this.selectToday()
  }
  
  cuentaArray() {
    let mes = formatDate(this.today,'MMMM','es','+0430');
    var cantDays : number  
    switch (mes) {
      case 'enero': 
      case 'marzo':
        break;
      case 'abril':
        cantDays = this.nroDays[0];
        break;
    }
    return console.log(cantDays);
  }

} 
