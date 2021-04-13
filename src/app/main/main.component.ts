import {Component, OnInit} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {SecurityService} from '../common/service/security.service';
import {AppService} from '../app.service';
import {Message} from 'primeng/api';
import {MsgService} from '../common/service/msg.service';
import {filter, mergeMap, tap} from 'rxjs/internal/operators';
import {timer} from 'rxjs/index';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    msgs: Message[] = [];
    growls: Message[] = [];
    pl: boolean;

    constructor(private securityService: SecurityService,
                private app: AppService,
                private router: Router,
                private msgService: MsgService) {
        this.pl = false
    }

    ngOnInit(): void {
        this.msgService.msgs.pipe(
            filter(message => message != null),
            tap(message => this.msgs.push(message)),
            mergeMap(message => timer(20000)
                .pipe(
                    tap(() =>
                        this.msgs.splice(this.msgs.findIndex(value => value === message), 1)
                    )
                ))
        ).subscribe();
        this.msgService.growls
            .pipe(
                filter(growl => growl != null),
                tap(growl => this.growls.push(growl)),
                mergeMap(growl => timer(5000)
                    .pipe(
                        tap(() =>
                            this.growls.splice(this.growls.findIndex(value => value === growl), 1)
                        )
                    ))
            ).subscribe();
        this.msgService.clear.subscribe(clear => {
                if (clear) {
                    this.clearMessages();
                }
            }
        );
        this.router.events.pipe(
            filter(event => event instanceof NavigationStart)
        ).subscribe(() => {
            this.msgService.clearAll();
        });
    }

    clearMessages() {
        this.msgs.splice(0, this.msgs.length);
        this.growls.splice(0, this.growls.length);
    }

}
