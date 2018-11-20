import { MainService } from './../../core/services/main.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'fuse-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FuseFooterComponent implements OnInit {

    constructor(
        private mainServ: MainService
    ) {
    }

    ngOnInit() {
    }
    changeTo(url) {
        this.mainServ.globalServ.goTo(url)
    }


}
