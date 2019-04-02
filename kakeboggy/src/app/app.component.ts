import { Component } from '@angular/core';

@Component({
  selector: 'app-root, date-pipe',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Kakeboggy';
  today: number = Date.now();
}
