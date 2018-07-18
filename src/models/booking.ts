import { UserViewModel } from './auth';

export class Booking {
  Id: number;
  UserId: string;
  ThongTin: string;
  GhiChuHtml: string;
  TuNgay: any;
  DenNgay: any;
  IsCaNgay: boolean;
  CheDoLapLaiJson: string;
  ViTriGeoJSON: string;
  CheDoThongBaoJson: string;
  MauSacHienThiJson: string;
  CheDoCongKhaiJson: string;
  DanhSachNhanVienSpaJson: string;
  DanhSachNhanVienSpa: UserViewModel;
  DanhSachKhachMoiJson: string;
  DanhSachKhachMoi: UserViewModel;

}
