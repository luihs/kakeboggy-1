import { Component, OnInit } from '@angular/core';  
import { animate, state, style, transition, trigger, animation} from   '@angular/animations'
import { formatDate } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { Countnum } from 'src/app/model/countnum';
import { empty } from 'rxjs';

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
  //next: number;
  mes: string;
  year: number;

  ngOnInit() {
    this.obtenCantDia()
  }
  
  obtenCantDia() {
    var mes = formatDate(this.today,'M','es','+0430');
    var mesview = formatDate(this.today, 'MMMM', 'es', '+0430');
    var yrs = formatDate(this.today, 'yyyy', 'es','+0430');
    var days : number    
    this.year = +yrs;
    var firstword = mesview.substring(0,1);
    var upperfsword = firstword.toUpperCase();
    var fixedmoth = upperfsword + mesview.substring(1,);
    this.mes = fixedmoth
    days = this.getDaysofMonth(+mes);
    sessionStorage.setItem('mes1', mes);
    sessionStorage.setItem('year', yrs);
    this.overwriteCalendar(days)
  }

  nextMonth(){
    var month : number;
    var mesactual = sessionStorage.getItem('mes1');
    var nextmth: number;
    nextmth = +mesactual + 1;
    this.verifyAccessStorage();
    let acc: string = sessionStorage.getItem("acceso")
    sessionStorage.setItem('active', 's');
    
    if (acc == "s"){
      month = this.getDaysofMonth(nextmth);
      this.overwriteCalendar(month);
      this.mes = this.changeMonthDescription(nextmth)
      this.verifyAccessStorage();
      sessionStorage.setItem("mes1",nextmth + "")
    }else{
      var checkmonth: number = +sessionStorage.getItem('mes1')
      if (checkmonth == 12){
        sessionStorage.setItem("mes1","0")
      }
      var nextmonth2:number = +sessionStorage.getItem("mes1") + 1 
      sessionStorage.setItem("mes2", nextmonth2 + "")
      sessionStorage.setItem("mes1", sessionStorage.getItem("mes2"))
      this.mes = this.changeMonthDescription(nextmonth2);
      
      if (sessionStorage.getItem("mes1") == "1"){
       this.year = this.changeYearFunction()
      }
      month = this.getDaysofMonth(nextmonth2);
      this.overwriteCalendar(month) 
    }
  }

  previousMoth(){

    if (sessionStorage.getItem('mes1') == '0'){
      sessionStorage.setItem('mes1', '12');
      
    }else if (sessionStorage.getItem('mes1') == '1'){
      sessionStorage.setItem('mes1', '13');
      sessionStorage.setItem('year', +sessionStorage.getItem('year') -1 + '')
    }

    var month: string = sessionStorage.getItem('mes1')
    var m = +month - 1

    var prevDays = this.getDaysofMonth(m);
    var strMonth = this.changeMonthDescription(m);

    //Set to view component
    this.mes = strMonth
    this.overwriteCalendar(prevDays);
    this.year = +sessionStorage.getItem('year');
    sessionStorage.setItem('mes1', m +'')
    console.log(m)
  }

  /*******************************/
  /**CALENDAR MODULE OWN METHODS**/
  /*******************************/

   overwriteCalendar(day: number){
     this.cantDaysOfMonth = []
    var x: number
    for (let i = 1; i <= day; i++) {
      x = i;
      this.cantDaysOfMonth.push(x);
    }
    x = 0
  }

  getDaysofMonth(month: number){
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
        if (sessionStorage.getItem('active') == 's') {
          cantDays = this.leapyear(+sessionStorage.getItem('year'))
        } else{
          cantDays = this.leapyear(+formatDate(this.today,'yyyy','es','+0430'))
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

  changeYearFunction(){
    var thisyear  = formatDate(this.today, 'yyyy', 'es', '+0430');
    var yearplus: number;
    
    if (sessionStorage.getItem('year') == null){
      var yearone = +thisyear + 1;
      sessionStorage.setItem('year', yearone + '')
      return yearone;
    } else {
      yearplus = +sessionStorage.getItem("year") + 1        
      sessionStorage.setItem('year', yearplus + '')
      return yearplus;
    }
  }

  leapyear(year : number){
    if ((year % 4 === 0 && year % 100 !== 0) || (year % 100 === 0 && year % 400 === 0)) {
      console.log("es biciesto " + year)
      return this.nroDays[3]
    } else {
      return this.nroDays[2]
    }
  }

  backToCurrentDate(){

  }
} 
 