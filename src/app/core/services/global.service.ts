import { CallApiService } from './call-api.service';
import { MatDialog } from '@angular/material';
// import { ErrorModalComponent } from './../error-modal/error-modal.component';
import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DatePipe } from '@angular/common';


@Injectable()
export class GlobalService {
  notification;
  unreadNot;

  private unreadNotBeh = new BehaviorSubject<number>(0);
  private notificationBeh = new BehaviorSubject<any>([]);

  private filteringBeh = new BehaviorSubject<any>({});

  castUnreadNotBeh = this.unreadNotBeh.asObservable();
  castNotificationBeh = this.notificationBeh.asObservable();
  castFilteringBeh = this.filteringBeh.asObservable();
  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog, public APIServe: CallApiService) {
    this.notification = [];
    this.unreadNot = 0;
  }

  colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

  getColor(index) {
    if (this.colorArray[index] == null)
      index = this.colorArray.length % index;
    return this.colorArray[index];

  }
  goTo2(id) {
    this.router.navigateByUrl('/detail').then(() => this.router.navigateByUrl('/detail/' + id));

  }

  editUnreadNotBeh(unreadNotBeh) {
    this.unreadNotBeh.next(unreadNotBeh);
  }

  editNotificationBeh(notificationBeh) {
    this.notificationBeh.next(notificationBeh);
  }


  editFilteringBeh(filteringBeh) {
    this.filteringBeh.next(filteringBeh);
  }

  getNotification() {
    return this.notification;
  }



  setNotification(notification) {
    this.notification = notification;
  }

  setUnreadNot(unreadNot) {
    this.unreadNot = unreadNot;
  }

  getUnreadNot() {
    return this.unreadNot;
  }

  private diff_minutes(dt2, dt1) {

    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60);
    return Math.abs(Math.round(diff));

  }

  private diff_hours(dt2, dt1) {

    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(Math.round(diff));

  }

  private diff_days(dt2, dt1) {

    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60 * 24);
    return Math.abs(Math.round(diff));

  }

  private diff_week(dt2, dt1) {

    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60 * 24 * 7);
    return Math.abs(Math.round(diff));

  }

  private diff_month(dt2, dt1) {

    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60 * 24 * 30);
    return Math.abs(Math.round(diff));

  }
  calculatDateAdv(date) {
    var time = this.diff_minutes(new Date(), new Date(date))
    var pipe = new DatePipe('en-US'); // Use your own locale

    if (time < 1)
      return "الأن"
    else if (time < 60)
      return time + " دقيقة ";
    else if (this.diff_hours(new Date(), new Date(date)) < 24)
      return this.diff_hours(new Date(), new Date(date)) + " ساعة ";
    else if (this.diff_days(new Date(), new Date(date)) < 7)
      return this.diff_days(new Date(), new Date(date)) + " يوم ";
    else
      return pipe.transform(date, 'dd-MM-yyyy');


  }

  goTo(newURL) {
    this.router.navigate([newURL]);
  }
  reload() {
    location.reload();
  }

  errorDialog(title, containt, withRefrech: boolean = false) {
    // let dialogRef = this.dialog.open(ErrorModalComponent, {
    //   width: '50%',
    //   data: { title: title, containt: containt }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   if (withRefrech == true) {
    //     location.reload();
    //   }
    // });
  }

  somthingError() {
    // this.APIServe.setErrorCode(0);
    // this.errorDialog('حدث خطأ', "هناك مشكلة ما")
  }

  convertNumber(fromNum) {
    console.log("fromNum");
    console.log(fromNum);
    console.log("fromNum.length");
    console.log(fromNum.length);
    var result = "";
    var number;
    var arabicMap = {
      '٩': 9,
      '٨': 8,
      '٧': 7,
      '٦': 6,
      '٥': 5,
      '٤': 4,
      '٣': 3,
      '٢': 2,
      '١': 1,
      '٠': 0
    };
    for (var index = 0; index < fromNum.length; index++) {
      var element = fromNum.charAt(index);
      console.log("element");
      console.log(element);
      if (arabicMap[element] != null)
        result += arabicMap[element];
      else
        result += element;
    };
    console.log("result");
    console.log(result);
    number = Number(result);
    console.log("number");
    console.log(number);
    return number;
  }

}
