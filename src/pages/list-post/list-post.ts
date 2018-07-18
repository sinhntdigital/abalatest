import { WpMedia } from './../../models/wp-media';
import { WpPostDetailPage } from './../wp-post-detail/wp-post-detail';
import { environment } from './../../environments/environment';
import { WpCategory, WpPost } from './../../models/wp-model';
import { UserViewModel } from './../../models/auth';
import { AuthService } from './../../providers/auth-service/auth-service';
import { Component, Input, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, App, LoadingController, Loading, Content } from 'ionic-angular';
import { Title } from '@angular/platform-browser';
import { WordpressProvider } from '../../providers/wordpress/wordpress';

/**
 * Generated class for the ListPostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'high'
})
@Component({
  selector: 'page-list-post',
  templateUrl: 'list-post.html',
})
export class ListPostPage {
  @Input() pageTitle: 'Danh sách';
  @Input() user: UserViewModel = new UserViewModel();

  selectedCategory: WpCategory;

  listWpPost: Array<WpPost>;
  loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private app: App,
    private titleService: Title,
    private authService: AuthService,
    private wordpressService: WordpressProvider,
    private loadingCtrl: LoadingController
  ) {
    this.showLoading();
    // this.titleService.setTitle ('An Awesome Title');
    // this.app.setTitle('people');
    this.user = authService.user;

    // If we navigated to this page, we will have an item available as a nav param
    this.selectedCategory = navParams.get('category');
    if (this.selectedCategory == undefined) {
      // this.selectedCategory = new WpCategory();
      this.selectedCategory = environment.settings.listWpCategory[0];
    }

    this.loadPostByCategory(this.selectedCategory);
  }
  @ViewChild(Content) content: Content;

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPostPage');


  }
  ngAfterViewInit() {
    if (this.content)
      this.content.resize();
  }

  loadPostByCategory(category: WpCategory) {

    // this.showLoading();
    this.wordpressService.getPostByCategory(this.selectedCategory.id).subscribe((data: WpPost[]) => {
      // this.loading.dismiss();
      if (this.refresher) {
        this.refresher.complete();

      }


      if (data == null) {
        // this.login();
        // this.closeLoading();
        return;
      }
      this.listWpPost = data;
      this.closeLoading();
    });
  }

  // loadPostFeaturedMedia(post: WpPost) {

  //   // this.showLoading();
  //   this.wordpressService.getPostFeaturedMedia(post.featured_media).subscribe((data: WpMedia) => {
  //     // this.loading.dismiss();
  //
  //     if (data == null) {
  //       // this.login();
  //       return;
  //     }
  //     post.agileMedia = data;

  //   });
  // }

  postTapped(event, itemPost: WpPost) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(WpPostDetailPage, {
      post: itemPost
    });
  }
  refresher: any;
  doRefresh(refresher) {
    this.refresher = refresher;
    // console.log('Begin async operation', refresher);
    this.loadPostByCategory(this.selectedCategory);

    // setTimeout(() => {
    //   console.log('Async operation has ended');
    //   refresher.complete();
    // }, 2000);
  }

  showLoading() {

    this.loading = this.loadingCtrl.create({
      content: 'Đang xử lý...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  closeLoading() {
    try {

      if (this.loading) {
        this.loading.dismiss();
      }
    } catch (error) {

    }
  }
}
