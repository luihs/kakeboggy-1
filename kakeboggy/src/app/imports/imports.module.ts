import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportscptComponent } from './importscpt/importscpt.component';

@NgModule({
  declarations: [ImportscptComponent],
  imports: [
    CommonModule
  ],
  exports: [ImportscptComponent]
})
export class ImportsModule { }
