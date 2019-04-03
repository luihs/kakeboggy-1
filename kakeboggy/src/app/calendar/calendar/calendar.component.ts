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
  nroDays = [30, 31, 28, 29];
  cantDaysOfMonth: any = [];
  //fecha actual
  today: number = Date.now();

  model: NgbDateStruct;
  date: {year: number, month: number};

  constructor(private calendar: NgbCalendar) { }

  selectToday() {
    this.model = this.calendar.getToday();
  }

  cantdia: number ;

  ngOnInit() {
    this.obtenCantDia()
    this.selectToday()
    this.toArrayDays()
    console.log(this.cantDaysOfMonth)
  }
  
  obtenCantDia() {
    var mes = formatDate(this.today,'MMMM','es','+0430');
    let dia = formatDate(this.today,'dd','es','+0430');
    var cantDays : number
    var days : number    
    days = +dia;
    switch (mes) {
      case 'enero': 
      case 'marzo':
      case 'mayo':
      case 'julio':
      case 'agosto':
      case 'octubre':
      case 'diciembre':
        cantDays = this.nroDays[1];
        break;
      case 'febrero':
        if (days < 28) {
          cantDays = this.nroDays[2];
        } else{
          cantDays = this.nroDays[3];
        }
        break;  
      case 'abril':
      case 'junio':
      case 'setiembre':
      case 'noviembre':
        cantDays = this.nroDays[0];
        break;
    }
    return this.cantdia = cantDays;
  }

  toArrayDays(){
    var x : number;
    for (let i = 0; i < this.cantdia ; i++) {
      x = i;
    }
    return this.cantDaysOfMonth[x] = x
  }

} 
