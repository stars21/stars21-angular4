import { Injectable } from "@angular/core";
import { HttpService } from "@myproject/core/http/http.service";
import { error } from "util";
import { Result } from "@myproject/core/http/result.model";


@Injectable()
export class LayoutService {

    constructor(private _http: HttpService) {

    }

    getAllMenus(): Promise <Result | Object> {
        return this._http.get('api/sys/menu/tree', null);
    }


}