import { element } from 'protractor';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainService } from './../../../core/services/main.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { timeInterval } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';
import { NavigationModel } from '../../../navigation.model';
import { FuseNavigationService } from '../../../core/components/navigation/navigation.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { Socket } from 'ng-socket-io';

@Component({
    selector: 'fuse-offline',
    templateUrl: './offline.component.html',
    styleUrls: ['./offline.component.scss']
})
export class FuseofflineComponent {
    navigationModel: NavigationModel;
    compagins = [];
    headLines: any;
    form: FormGroup;
    loadingIndicator = true;
    reorderable = true;
    allRowsSelected: any;
    refreshTime = 20 * 1000;
    minDate = new Date(1900, 0, 1);
    maxDate = new Date();
    locations = [{ "name": "all", "routerName": "" }];

    rows = [];
    count: number = 0;
    offset: number = 0;
    limit: number = 10;

    colorsLocation = [];



    startTime;
    endTime;

    private onDestroy$ = new Subject<void>();

    constructor(private route: ActivatedRoute, private formBuilder: FormBuilder,
        private mainServ: MainService, private router: Router,
        private socket: Socket) {
        this.refresh();


        // this.navigationModel = new NavigationModel(mainServ);

    }

    fillColorArrray() {
        for (var index = 0; index < this.locations.length; index++) {
            var element = this.locations[index];
            this.colorsLocation[element.routerName] = this.mainServ.globalServ.getColor(index);

        }
    }

    ngOnInit() {

        this.form = this.formBuilder.group({
            location: [this.locations[0]],
            mobile: [''],
            from: [''],
            ip: [''],
            to: ['']
        });

        this.loadingIndicator = false;

        this.mainServ.APIServ.get("locations?filter={\"where\" :{\"isp_id\":" + this.mainServ.loginServ.getUserId() + "} }").subscribe((data: any) => {
            this.loadingIndicator = true;
            if (this.mainServ.APIServ.getErrorCode() == 0) {
                data.forEach(element => {
                    this.locations.push(element);
                });
                this.fillColorArrray();
                this.initData();
            }
            else if (this.mainServ.APIServ.getErrorCode() == 400) {

            }
            else {
                this.mainServ.globalServ.somthingError();
            }

        });

    }


    initData(startTime: Date = null, endTime: Date = null) {
        this.mainServ.APIServ.get("clients/countOfflineUsersIsp?mobile=" + this.form.value['mobile'] + "&location=" + this.form.value['location'].routerName + "&from=" + this.form.value['from'] + "&to=" + this.form.value['to'] + "&ip=" + this.form.value['ip']).subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {
                console.log(data['count'])
                this.count = data['count']
                this.getData(this.offset, this.limit)
                Observable.interval(this.refreshTime).subscribe(() =>
                    this.getData(this.offset, this.limit, false)
                )
            }
        })
    }


    search(startTime: Date = null, endTime: Date = null) {
        this.offset = 0;
        this.initData(startTime, endTime);
    }
    getData(offset, limit, wihtLoder: boolean = true, startTime: Date = null, endTime: Date = null) {
        if (wihtLoder)
            this.loadingIndicator = false;
        var startHoure = 0;
        var startMin = 0;
        var endHoure = 23;
        var endMin = 59;
        if (this.form.value['from'] != '') {
            console.log("startTime")
            console.log(startTime)

            if (startTime != null && startTime['userTime'] != null) {
                this.startTime = startTime['userTime'];
            }

            if (this.startTime != null) {
                startHoure = this.startTime['hour'];
                if (this.startTime['meriden'] == 'PM')
                    startHoure += 12

                startMin = this.startTime['minute'];
            }
            this.form.value['from'].setHours(startHoure);
            this.form.value['from'].setMinutes(startMin);

        }

        if (this.form.value['to'] != '') {

            if (endTime != null && endTime['userTime'] != null) {
                this.endTime = endTime['userTime'];
            }


            if (this.endTime != null) {
                endHoure = this.endTime['hour'];
                if (this.endTime['meriden'] == 'PM')
                    endHoure += 12
                endMin = this.endTime['minute'];
            }

            this.form.value['to'].setHours(endHoure);
            this.form.value['to'].setMinutes(endHoure);
        }

        this.mainServ.APIServ.get("clients/onlineUsersIsp?mobile=" + this.form.value['mobile'] + "&location=" + this.form.value['location'].routerName + "&from=" + this.form.value['from'] + "&to=" + this.form.value['to'] + "&ip=" + this.form.value['ip'] + "&isExport=3&skip=" + limit * offset).subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {
                this.loadingIndicator = true;
                this.rows = data;
            }
        })

    }

    export() {
        this.mainServ.APIServ.get("clients/onlineUsersIsp?mobile=" + this.form.value['mobile'] + "&location=" + this.form.value['location'].routerName + "&from=" + this.form.value['from'] + "&to=" + this.form.value['to'] + "&ip=" + this.form.value['ip'] + "&isExport=1").subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {
                var win = window.open(data.path, '_blank');
                win.focus();
            }
        })

    }

    getLocation(routeName) {
        for (var index = 0; index < this.locations.length; index++) {
            var element = this.locations[index];
            if (element.routerName == routeName) {
                return element.name;
            }
        }
    }

    refresh() {
        // this.loadingIndicator = false;
        // setTimeout(() => {
        //     this.initData();
        // }, 100);
    }

    onPage(event) {
        console.log('Page Event', event);
        this.offset = event.offset;
        this.limit = event.limit;
        this.getData(this.offset, this.limit);
    }

    // ngOnDestroy() {
    //     console.log("out");
    //     this.onDestroy$.next();
    // }


}
