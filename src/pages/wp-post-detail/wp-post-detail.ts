import { WpPost } from './../../models/wp-model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';

/**
 * Generated class for the WpPostDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wp-post-detail',
  templateUrl: 'wp-post-detail.html',
})
export class WpPostDetailPage {
  selectedPost: WpPost;
  loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private loadingCtrl: LoadingController) {
      this.showLoading();
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedPost = navParams.get('post');
    if (this.selectedPost == undefined) {
      // this.selectedCategory = new WpCategory();
      this.selectedPost = new WpPost();
    }
    this.closeLoading();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WpPostDetailPage');
  }

  showLoading() {

    this.loading = this.loadingCtrl.create({
      content: 'Đang xử lý...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  closeLoading(){
    try {
      if(this.loading){
        this.loading.dismiss();
      }
    } catch (error) {

    }
  }

}
