import { BookingCreatePage } from './../booking-create/booking-create';
import { WpCategory } from './../../models/wp-model';
import { environment } from './../../environments/environment';
import { ListPostPage } from './../list-post/list-post';
import { Component, Input } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
import { UserViewModel, LoginModel } from '../../models/auth';
import { LoginPage } from '../login/login';
import { UserProfilePage } from '../user-profile/user-profile';
// import { hubConnection } from 'signalr-no-jquery';
import { ToastController } from 'ionic-angular';

import * as signalR from '@aspnet/signalr';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @Input() user: UserViewModel = new UserViewModel();
  loading: Loading;

  listWpCategorylist: Array<WpCategory> = [];

  connection: signalR.HubConnection;
  hubProxy: any;
  constructor(public navCtrl: NavController,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private storage: Storage) {

    this.listWpCategorylist = environment.settings.listWpCategory;

    this.loadLoginToken();

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(environment.apiUrl + "/chatHub")
      .build();

    this.connection.on("ReceiveMessage", (user, message) => {

      this.presentToastUser(user, message);
    });

    this.connection.start().catch(err => {
      // console.error(err.toString());
    }
    );
  }

  sendMessenger() {
    this.connection.send("SendMessage", this.user, "hello").then((data) => {

    }).catch(err => {

      // console.error(err.toString());
    });
    // this.connection.invoke("SendMessage", "abc", "hello").catch(err => {
    //
    //   // console.error(err.toString());
    // });
  }

  presentToastUser(user: UserViewModel, message: string) {
    this.presentToast(user.Fullname + ": " + message);
  }
  presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  loadLoginToken() {
    //
    // this.showLoading();
    // Or to get a key/value pair
    this.storage.get('loginToken').then((val) => {
      //
      console.log('Your loginToken is', val);
      this.authService.token = val;
      // this.loading.dismiss();
      this.loadDataUser();
    }).catch((error) => {
      //
      console.log('Your error is', error);
      // this.loading.dismiss();
      this.navCtrl.setRoot(LoginPage);
    });
  }

  loadDataUser() {

    // this.showLoading();
    this.authService.getUserInfo().subscribe((data: UserViewModel) => {
      // this.loading.dismiss();
      if (data == null) {
        this.login();
        return;
      }
      console.log('user info ', data);
      this.user = data;
      this.storage.set('loginUser', JSON.stringify(this.user));
      //
      this.authService.user = this.user;

      //TODO: thực hiện chức năng tự động trên giao diện để test, debub
      this.bookingCreate();

    },
      (error) => {
        console.log(error);

      }
    );
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


  login() {
    this.navCtrl.setRoot(LoginPage);
  }
  logout() {
    this.authService.logout().subscribe(succ => {
      this.navCtrl.setRoot(LoginPage);
    });
  }

  updateProfile() {
    this.navCtrl.push(UserProfilePage);
  }

  categoryTapped(event, itemCategory: WpCategory) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPostPage, {
      category: itemCategory
    });
  }

  bookingCreate(){
    this.navCtrl.push(BookingCreatePage);
  }




}
