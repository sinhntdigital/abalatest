import { Component, Input } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { RegisterViewModel } from '../../models/auth';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  createSuccess = false;
  registerCredentials = new RegisterViewModel();


   @Input() listBirthdayDay: Array<number> = [];
   @Input() listBirthdayMonth: Array<number> = [];

   @Input() listBirthdayYear: Array<number> = [];


  constructor(
    private nav: NavController,
    private auth: AuthService,
    private alertCtrl: AlertController
  ) {
    
    for (let index = 0; index < 31; index++) {
      this.listBirthdayDay.push(index+1);
    }
    for (let index = 0; index < 12; index++) {
      this.listBirthdayMonth.push(index+1);
    }
    for (let index = 2018; index >= 1905; index--) {
      this.listBirthdayYear.push(index);
    }
  }

  public register() {
    if (this.registerCredentials.Password != this.registerCredentials.ConfirmPassword) {
      this.showPopup("Error", 'Mật khẩu xác nhận chưa khớp.');
    } else {
      
      this.auth.RegisterUser(this.registerCredentials).subscribe(success => {
        
        if (success) {
          this.createSuccess = true;
          this.showPopup("Thành công", "Đã tạo được tài khoản.");
        } else {
          this.showPopup("Error", "Problem creating account.");
        }
      },
        error => {
          this.showPopup("Error", error);
        });
    }
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }

  public onKeyUp(event: any) {
   const NUMBER_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/;

    let newValue = event.target.value;
    let regExp = new RegExp(NUMBER_REGEXP);

    if (!regExp.test(newValue)) {
      event.target.value = newValue.slice(0, -1);
    }
  }
}
