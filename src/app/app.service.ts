import { Injectable } from '@angular/core'

@Injectable()
export class AppService {

    checkLogin() {
        let token: string = window.localStorage.token;
        return token && token.length > 30;
    }

}