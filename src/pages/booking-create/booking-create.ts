import { SelectUserPage } from './../select-user/select-user';
import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Booking } from '../../models/booking';
import { BookingService } from '../../providers/booking/booking.service';
import { environment } from '../../environments/environment';
import { UserViewModel } from '../../models/auth';
import { AuthService } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';
import { DatePipe } from '@angular/common';

/**
 * Generated class for the BookingCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-booking-create',
  templateUrl: 'booking-create.html',
})
export class BookingCreatePage {
  @Input() user: UserViewModel = new UserViewModel();

  @Input() public event = {
    TuNgay_Date: '2018-07-05',
    TuNgay_Time: '07:43',
    DenNgay_Date: '2018-07-05',
    DenNgay_Time: '08:43',
  }

  @Input() itemBooking: Booking = new Booking();

  @Input() tempCheDoThongBaoJson: any = {
    "HanhDong": "Thông báo",
    "SoLuongThoiGian": 30,
    "DonViThoiGian": "phút"
  };

  @Input() tempCheDoCongKhaiJson: any = {
    "MucCongKhai": "công khai",
    "KieuCongKhai": "bận",
  }

  constructor(private service: BookingService, public navCtrl: NavController, public navParams: NavParams,
    private toastCtrl: ToastController,
    public datepipe: DatePipe,
    private authService: AuthService) {
    if (this.authService.user == null) {
      this.login();
    }
    // debugger;
    this.user = this.authService.user;
    this.itemBooking.UserId = this.user.Id;
    this.itemBooking.CheDoLapLaiJson = 'Không lặp lại';
    this.itemBooking.ViTriGeoJSON = 'https://www.google.com/maps/place/102+Nguy%E1%BB%85n+Th%E1%BB%8B+Minh+Khai/@16.0717709,108.2183259,20.94z/data=!4m12!1m6!3m5!1s0x31421836c27133a1:0xada05618ea087149!2zMTAyIE5ndXnhu4VuIFRo4buLIE1pbmggS2hhaQ!8m2!3d16.071817!4d108.2185!3m4!1s0x31421836c27133a1:0xada05618ea087149!8m2!3d16.071817!4d108.2185';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingCreatePage');
  }

  save(event) {
    var tDate =new Date();
    let latest_date =this.datepipe.transform(this.event.TuNgay_Date , 'yyyy/MM/dd');

    this.itemBooking.TuNgay = new Date(latest_date + " " + this.event.TuNgay_Time);
    latest_date =this.datepipe.transform(this.event.DenNgay_Date , 'yyyy/MM/dd');

    this.itemBooking.DenNgay = new Date(latest_date + " " + this.event.DenNgay_Time);
    this.itemBooking.CheDoCongKhaiJson = JSON.stringify(this.tempCheDoCongKhaiJson);
    this.itemBooking.CheDoThongBaoJson = JSON.stringify(this.tempCheDoThongBaoJson);
    this.itemBooking.DanhSachNhanVienSpaJson = JSON.stringify(this.itemBooking.DanhSachNhanVienSpa);
    this.itemBooking.DanhSachKhachMoiJson = JSON.stringify(this.itemBooking.DanhSachKhachMoi);
    this.itemBooking.UserId = this.user.Id;

    debugger;

    this.service.addBooking(this.itemBooking, this.authService.token).subscribe(data => {
      debugger;
      if (data != null && data.Id > 0) {
        console.log('save ok!');
        this.presentToast("Đã tạo lịch hẹn Spa thành công!");
        this.goToList(null);
      }
    });
    return;



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

  goToList(event) {
    // window.location.href = environment.settingBooking.urlPageBookingList;
    this.navCtrl.pop();
  }

  login() {
    this.navCtrl.setRoot(LoginPage);
  }

  selectUser_Employee() {
    this.navCtrl.push(SelectUserPage, {
      itemBooking: this.itemBooking,
      filterUser: 'Employee'
    });

  }

  selectUser_Friend() {
    this.navCtrl.push(SelectUserPage, {
      itemBooking: this.itemBooking,
      filterUser: 'Friend'
    });
  }
}
