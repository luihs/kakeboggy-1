import { Component, OnInit } from '@angular/core';  
import { animate, state, style, transition, trigger, animation} from   '@angular/animations'
import { formatDate } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { Countnum } from 'src/app/model/countnum';
import { empty } from 'rxjs';
import { exists } from 'fs';

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
  nroDays = [30, 31, 28, 29];
  cantDaysOfMonth: any = [];
  lssDays: any;
  lstDays: number;
  today: number = Date.now();
  cantdia: number ;
  next: number;
  mes: string;

  ngOnInit() {
    this.obtenCantDia()
  }
  
  obtenCantDia() {
    var mes = formatDate(this.today,'M','es','+0430');
    var dia = formatDate(this.today,'d','es','+0430');
    var days : number    
    var x: number
    days= this.getDaysofMonth(+mes, +dia);
    for (let i = 1; i <= days; i++) {
      x = i;
      this.cantDaysOfMonth.push(x);
    }
  }

  nextMonth(){
    var month : number;
    var mesactual = formatDate(this.today,'M','es','+0430');
    var dayofmonth = formatDate(this.today,'d','es','+0430');
    var nextmth: number;
    nextmth = +mesactual + 1;
    //var monthstring: string = nextmth + ""
    console.log("mes siguiente " + nextmth)
    this.verifyAccessStorage();
    let acc: string = sessionStorage.getItem("acceso")
    console.log("acceso " + sessionStorage.getItem("acceso"))
    if (acc == "s"){
      console.log(nextmth)
      month = this.getDaysofMonth(nextmth, +dayofmonth);
      this.next = month;
      this.mes = this.changeMonthDescription(nextmth)
      this.verifyAccessStorage();
      sessionStorage.setItem("mes1",nextmth + "")
      console.log("termina")
    }else{
      var nextmonth2:number = +sessionStorage.getItem("mes1") + 1 //Agosto -> Sep
      console.log(nextmonth2);
      sessionStorage.setItem("mes2", nextmonth2 + "")//Guardando Sep
      sessionStorage.setItem("mes1", sessionStorage.getItem("mes2"))
      //month = this.getDaysofMonth(mesguardado, +dayofmonth);
      this.mes = this.changeMonthDescription(nextmonth2);
      //sessionStorage.setItem("mes",mesguardado + "")
      if (nextmonth2 == 12){
        sessionStorage.setItem("mes1","0")
      }
    }
  }

  /*******************************/
  /**CALENDAR MODULE OWN METHODS**/
  /*******************************/

  getDaysofMonth(month: number, day: number){
    var cantDays : number
    switch (month) {
      case 1: 
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        cantDays = this.nroDays[1];
        break;
      case 2:
        if (day < 28) {
          cantDays = this.nroDays[2];
        } else{
          cantDays = this.nroDays[3];
        }
        break;  
      case 4:
      case 6:
      case 9:
      case 11:
        cantDays = this.nroDays[0];
        break;
    }
    return cantDays
  }

  verifyAccessStorage(){
    var acceso:string = sessionStorage.getItem("acceso");
    console.log("string acceso " + acceso)
    if (acceso == null) {
      sessionStorage.setItem("acceso", "s");
    } else if  (acceso = "s"){
      sessionStorage.setItem("acceso", "n");
    }else {
      sessionStorage.setItem("acceso", "n");
    }
  }
  
  changeMonthDescription(month: number){
    let lstmonths: any = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre',
                          'Octubre', 'Noviembre', 'Diciembre']
    var descr: string
    switch (month) {
      case 1:
        descr = lstmonths[0];
        break;
      case 2:
        descr = lstmonths[1];
        break;
      case 3:
        descr = lstmonths[2];
        break;
      case 4:
        descr = lstmonths[3];
        break;
      case 5:
        descr = lstmonths[4];
        break
      case 6:
        descr = lstmonths[5];
        break;
      case 7:
        descr = lstmonths[6];
        break;
      case 8:
        descr = lstmonths[7];
        break;
      case 9:
        descr = lstmonths[8];
        break;
      case 10:
        descr = lstmonths[9];
        break;
      case 11:
        descr = lstmonths[10];
        break;
      case 12:
        descr = lstmonths[11];
        break;
    }
    return descr
  }

  overwriteCalendar(month: number, day: number){

  }
} 
