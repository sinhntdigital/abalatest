import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookingCreatePage } from './booking-create';

@NgModule({
  declarations: [
    BookingCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(BookingCreatePage),
  ],
})
export class BookingCreatePageModule {}
