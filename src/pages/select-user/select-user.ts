import { UserEmployeeMalePipe } from './../../pipes/user-employee-male/user-employee-male';
import { UserEmployeeFemalePipe } from './../../pipes/user-employee-female/user-employee-female';
import { UserViewModel } from './../../models/auth';
import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Booking } from '../../models/booking';
import { LoginPage } from '../login/login';
import { AuthService } from '../../providers/auth-service/auth-service';
// import { UserViewModel } from '../../models/auth';
import { Pipe, PipeTransform } from '@angular/core';



/**
 * Generated class for the SelectUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-user',
  templateUrl: 'select-user.html',
})
export class SelectUserPage {
  @Input() itemBooking: Booking = new Booking();
  @Input() user: UserViewModel = new UserViewModel();

  @Input() listUser: Array<UserViewModel> = [];
  @Input() filterUser: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private authService: AuthService) {
    if (this.authService.user == null) {
      this.login();
    }
    // debugger;
    this.user = this.authService.user;
    // If we navigated to this page, we will have an item available as a nav param
    this.itemBooking = navParams.get('itemBooking');
    this.filterUser = navParams.get('filterUser');

    if (this.itemBooking == undefined) {
      // this.selectedCategory = new WpCategory();
      this.itemBooking = new Booking();
    }

    if (this.filterUser == 'Employee') {
      this.loadListUser_Employee();
    } else {
      this.loadListUser_Friend();
    }



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectUserPage');
  }

  login() {
    this.navCtrl.setRoot(LoginPage);
  }

  loadListUser_Employee() {

    // this.showLoading();
    this.authService.getListUser_Employee().subscribe((data: UserViewModel[]) => {

      if (data == null) {
        // this.login();
        // this.closeLoading();
        return;
      }

      this.listUser = data;

    });
  }

  loadListUser_Friend() {

    // this.showLoading();
    this.authService.getListUser_Friend().subscribe((data: UserViewModel[]) => {

      if (data == null) {
        // this.login();
        // this.closeLoading();
        return;
      }

      this.listUser = data;
      // debugger;
    });
  }
  selectUser(user: UserViewModel){
    if (this.filterUser == 'Employee') {
      this.selectUser_Employee(user);
    } else {
      this.selectUser_Friend(user);
    }

  }
  selectUser_Employee(user: UserViewModel) {

    this.itemBooking.DanhSachNhanVienSpa = user;
    this.navCtrl.pop();
  }

  selectUser_Friend(user: UserViewModel) {

    // this.itemBooking.DanhSachKhachMoi = [];
    // this.itemBooking.DanhSachKhachMoi.push(user);
    this.itemBooking.DanhSachKhachMoi = user;
    // debugger;
    this.navCtrl.pop();
  }


}
