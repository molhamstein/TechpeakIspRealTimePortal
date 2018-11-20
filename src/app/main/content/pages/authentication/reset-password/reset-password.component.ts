import { ActivatedRoute } from '@angular/router';
import { MainService } from './../../../../../core/services/main.service';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseConfigService } from '../../../../../core/services/config.service';
import { fuseAnimations } from '../../../../../core/animations';

@Component({
    selector: 'fuse-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
    animations: fuseAnimations
})
export class FuseResetPasswordComponent implements OnInit {
    resetPasswordForm: FormGroup;
    resetPasswordFormErrors: any;
    token: any
    constructor(
        private fuseConfig: FuseConfigService,
        private formBuilder: FormBuilder,
        private mainServ: MainService,
        private route: ActivatedRoute
    ) {
        this.fuseConfig.setSettings({
            layout: {
                navigation: 'none',
                toolbar: 'none',
                footer: 'none'
            }
        });

        this.resetPasswordFormErrors = {
            password: {},
            passwordConfirm: {}
        };

        this.route.queryParams
            .filter(params => params.access_token)
            .subscribe(params => {
                this.token = params.access_token;
            });
    }

    ngOnInit() {
        this.resetPasswordForm = this.formBuilder.group({
            password: ['', Validators.required],
            passwordConfirm: ['', Validators.required]
        });

        this.resetPasswordForm.valueChanges.subscribe(() => {
            this.onResetPasswordFormValuesChanged();
        });
    }

    onResetPasswordFormValuesChanged() {
        for (const field in this.resetPasswordFormErrors) {
            if (this.resetPasswordFormErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.resetPasswordFormErrors[field] = {};

            // Get the control
            const control = this.resetPasswordForm.get(field);

            if (control && control.dirty && !control.valid) {
                this.resetPasswordFormErrors[field] = control.errors;
            }
        }
    }

    resetPassword() {
        this.mainServ.APIServ.resetPassWord("partners/reset-password", this.resetPasswordForm.value,this.token).subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {

            }
            else if (this.mainServ.APIServ.getErrorCode() == 400) {

            }
            else {
                this.mainServ.globalServ.somthingError();
            }

        });
    }
}
