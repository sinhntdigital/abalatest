import { BookingCreatePage } from './../pages/booking-create/booking-create';
import { WordpressProvider } from './../providers/wordpress/wordpress';
import { WpPostDetailPage } from './../pages/wp-post-detail/wp-post-detail';
import { ListPostPage } from './../pages/list-post/list-post';
import { BrowserModule, Title } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../providers/auth-service/auth-service';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from '../message.service';
import { IonicStorageModule } from '@ionic/storage';
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { BookingService } from '../providers/booking/booking.service';
import { SelectUserPage } from '../pages/select-user/select-user';
import { PipesModule } from '../pipes/pipes.module';
import { UserEmployeeFemalePipe } from '../pipes/user-employee-female/user-employee-female';
import { DatePipe } from '@angular/common';
import { Demo1Page } from '../pages/demo1/demo1';
import { DemoPage } from '../pages/demo/demo';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    UserProfilePage,
    ListPostPage,
    WpPostDetailPage,
    BookingCreatePage,
    SelectUserPage,
Demo1Page,
DemoPage,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // UserEmployeeFemalePipe,
    PipesModule,
    IonicModule.forRoot(MyApp, {
      monthNames: ['Tháng giêng', 'Tháng hai', 'Tháng ba', 'Tháng tư', 'Tháng năm', 'Tháng sáu', 'Tháng bảy', 'Tháng tám', 'Tháng chín', 'Tháng mười', 'Tháng mười một', 'Tháng mười hai'],
      monthShortNames: ['Tháng giêng', 'Tháng hai', 'Tháng ba', 'Tháng tư', 'Tháng năm', 'Tháng sáu', 'Tháng bảy', 'Tháng tám', 'Tháng chín', 'Tháng mười', 'Tháng mười một', 'Tháng mười hai'],
      dayNames: ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'],
      dayShortNames: ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'],
    }),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    UserProfilePage,
    ListPostPage,
    WpPostDetailPage,
    BookingCreatePage,
    SelectUserPage,
Demo1Page,
DemoPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthService, MessageService,
    Title,
    WordpressProvider,
    BookingService,
    DatePipe,
  ]
})
export class AppModule { }
