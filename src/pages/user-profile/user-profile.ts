import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { UserViewModel } from '../../models/auth';
/**
 * Generated class for the UserProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {
  @Input() user: UserViewModel = new UserViewModel();
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private storage: Storage) {
    if (this.authService.user == null) {
      this.login();
    }
    this.user = this.authService.user;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProfilePage');
  }

  login() {
    this.navCtrl.setRoot(LoginPage);
  }

}
