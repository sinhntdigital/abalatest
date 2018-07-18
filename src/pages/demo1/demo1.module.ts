import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Demo1Page } from './demo1';

@NgModule({
  declarations: [
    Demo1Page,
  ],
  imports: [
    IonicPageModule.forChild(Demo1Page),
  ],
})
export class Demo1PageModule {}
