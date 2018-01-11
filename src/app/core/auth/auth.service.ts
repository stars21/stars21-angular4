import { Injectable }     from '@angular/core';
import { CanActivate, Router }    from '@angular/router';
import { AppService } from '@myproject/app.service';


@Injectable()
export class AuthService implements  CanActivate {

    constructor(private router: Router, private appService: AppService) {
    }

    canActivate() {
        if (this.appService.checkLogin()) {
            return true;
        } else {
            this.router.navigate(['login']);
        }
    }
}
