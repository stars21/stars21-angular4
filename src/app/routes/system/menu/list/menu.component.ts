import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { NzMessageService } from 'ng-zorro-antd';
import { MenuService } from '../menu.service'
import { Menu } from '../menu.model'
import { Operation } from '@myproject/core/enum/operation.enum';
import { Result } from '@myproject/core/http/result.model';

@Component({
    selector: 'sys-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
    providers: [MenuService]
})
export class MenuComponent implements OnInit {

    updateMenu: Menu;
    childOperation: Operation;

    _value: string;
    isVisible = false;

    _current = 1;
    _pageSize = 10;
    _dataSet = [];
    _loading = true;
    _total = 0;

    constructor(private menuService: MenuService, private confirmServ: NzModalService, private _message: NzMessageService, ) {
    }

    ngOnInit() {
        this.refreshData();
    }

    refreshData(reset = false) {
        if (reset) {
            this._current = 1;
        }
        this._loading = true;
        this.menuService.getAllMenus(this._current, this._pageSize, this._value).then(res => {
            this._total = res.totalElements;
            this._dataSet = res.content;
            this._loading = false;
        }).catch(error => {

        });
    }

    clickShowAdd() {
        this.childOperation = Operation.Add;
        let menu = new Menu();
        menu.level = 1;
        menu.status = 1;
        this.updateMenu = menu;
        this.isVisible = true;
    }

    clickUpdateMenu(data) {

    }

    clickAddChildMenu(data) {
        this.updateMenu = new Menu();
        this.updateMenu.topName = data.name;
        this.updateMenu.pid = data.id;
        this.updateMenu.level = data.level + 1;
        this.updateMenu.status = 1;
        this.childOperation = Operation.AddChild;
        this.isVisible = true;
    }

    clickDeleteMenu(id) {
        let self = this;
        this.confirmServ.confirm({
            title: '您是否确认要删除这项内容',
            showConfirmLoading: true,
            onOk() {
                return new Promise((resolve) => {
                    self.menuService.deleieMenu(id).then((res: Result) => {
                        self.refreshData();
                        self._message.create('success', '删除成功');
                        setTimeout(resolve, 100);
                    }).catch(error => {

                    })
                });
            },
            onCancel() {
            }
        });
    }

}