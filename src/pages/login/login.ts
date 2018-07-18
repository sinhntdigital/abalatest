import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading, ToastController } from 'ionic-angular';
import { LoginModel } from '../../models/auth';
import { AuthService } from '../../providers/auth-service/auth-service';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  @Input() user: LoginModel = new LoginModel();
  loading: Loading;
  // registerCredentials = { email: '', password: '' };
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private service: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.user.Email = 'nguyenanhtuan.agile@gmail.com';
    this.user.Password = 'Tuan!@#$1234#!)#';
    this.user.RememberMe = false;

    // this.login();
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Đang đăng nhập...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  login() {
    this.showLoading();
    // this.itemThietBi.IdDonViTinh = this.selectedDonViTinh.Id;	this.itemThietBi.IdNhomThietBi = this.selectedNhomThietBi.Id;

    this.service.RequestToken(this.user).subscribe(data => {

      if (data && data.token) {
        // localStorage.setItem('loginToken', data.token);
        this.storage.set('loginToken', data.token);

        console.log('save ok!', data.token);
        //
        this.loading.dismissAll();

        let alert = this.alertCtrl.create({
          title: 'Đăng nhập thành công',
          subTitle: 'Chào mừng bạn đã trở lại',
          buttons: ['OK']
        });
        alert.present();
        setTimeout(null, 2000);
        alert.dismiss();
        this.goToUserInfo(null);
      }
      else{
        this.loading.dismissAll();
this.presentToast("Chưa đăng nhập được. Bạn hãy thử lại hoặc liên hệ hotline hỗ trợ: 0918338234.");
      }
    });
  }
  goToUserInfo(event) {
    // window.location.href = environment.settingAuth.urlAuthUserInfo;
    this.navCtrl.setRoot(HomePage);
  }
  createAccount(){
    this.navCtrl.push(RegisterPage);
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
}
