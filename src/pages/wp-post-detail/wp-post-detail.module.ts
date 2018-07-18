import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WpPostDetailPage } from './wp-post-detail';

@NgModule({
  declarations: [
    WpPostDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(WpPostDetailPage),
  ],
})
export class WpPostDetailPageModule {}
