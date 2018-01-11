import { Component, OnInit, enableProdMode } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import { NzMessageService } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '@myproject/core/http/http.service';
import { Result } from '@myproject/core/http/result.model';
enableProdMode()
@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [FormBuilder, NzMessageService]
})
export class LoginComponent implements OnInit {
    validateForm: FormGroup
    isLoading = false
    loginText = '登录'
    header: Headers

    /**
     * 表单提交
     * @private
     */
    _submitForm() {
        if(this.validateForm.valid){
            this.isLoading = true
            this.loginText = '登录中..'
            let self = this
            this.httpService.post('public/user/login', this.validateForm.value).then((res: Result) => {
                if (res.resultCode === 0) {
                    setTimeout(() => {
                        self._message.create('success', '登录成功')
                        self.resetLogin()
                        localStorage.setItem('token', String(res.data));
                        self.router.navigate([''])
                    }, 1000)
                } else {
                    self._message.create('error', res.msg)
                    self.resetLogin()
                }
            }).catch(error => {

            });
        } else {
            for (const i in this.validateForm.controls) {
                this.validateForm.controls[ i ].markAsDirty()
            }
        }
    }

    resetLogin() {
        this.isLoading = false
        this.loginText = '登录'
    }

    constructor(private _message: NzMessageService, 
        private fb: FormBuilder, 
        private httpService: HttpService, 
        private router: Router) {}

    ngOnInit() {
        /* 设置表单验证字段，包括规则 */
        this.validateForm = this.fb.group({
            username: [ null, [ Validators.required ] ],
            password: [ null, [ Validators.required ] ],
            remember: [ true ]
        })
        this.header = new Headers({'Content-Type': 'application/json'})
    }
}
