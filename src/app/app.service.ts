import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs/index';

import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {MsgService} from './common/service/msg.service';

@Injectable()
export class AppService {
  private _blockUi = new BehaviorSubject(false);
  public readonly blockUi: Observable<boolean> = this._blockUi.asObservable();

  constructor(private messageService: MsgService) {
  }

  blockUI() {
    this._blockUi.next(true);
  }

  unblockUI() {
    this._blockUi.next(false);
  }

  handleError(router: Router, error: HttpErrorResponse) {
    if(error.error && error.error.text && error.error.text.indexOf('app-root') > -1){
      router.navigate(['/login']);
    } else {
      const err = error.error ? error.error : error;
      this.messageService.error(err.message ? err.message : err, true);
    }
    this.unblockUI();
  }

}
