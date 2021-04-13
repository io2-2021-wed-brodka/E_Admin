import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs/index';
import {Message} from 'primeng/api';


@Injectable()
export class MsgService {
  private _growls = new BehaviorSubject(null);
  public readonly growls: Observable<Message> = this._growls.asObservable();

  private _msmgs = new BehaviorSubject(null);
  public readonly msgs: Observable<Message> = this._msmgs.asObservable();

  private _clear = new BehaviorSubject(null);
  public readonly clear: Observable<Message> = this._clear.asObservable();

  info(text: string, showMessage: boolean = false) {
    const msg = {severity: 'info', summary: '', detail: text};
    this._growls.next(msg);
    if (showMessage) {
      this._msmgs.next(msg);
    }
  }

  success(text: string, showMessage: boolean = false) {
    const msg = {severity: 'success', summary: '', detail: text};
    this._growls.next(msg);
    if (showMessage) {
      this._msmgs.next(msg);
    }
  }

  warn(text: string, showMessage: boolean = false) {
    const msg = {severity: 'warn', summary: '', detail: text};
    this._growls.next(msg);
    if (showMessage) {
      this._msmgs.next(msg);
    }
  }

  error(text: string, showMessage: boolean = false) {
    const msg = {severity: 'error', summary: '', detail: text};
    this._growls.next(msg);
    if (showMessage) {
      this._msmgs.next(msg);
    }
  }

  clearAll() {
    this._msmgs.next(null);
    this._growls.next(null);
    this._clear.next(true);
  }
}
