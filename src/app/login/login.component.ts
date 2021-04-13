import {Component, OnInit} from '@angular/core';
import {SecurityService} from '../common/service/security.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthGuard} from "../common/guards/auth-guard";

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']

})
export class LoginComponent implements OnInit {

    credentials = {username: '', password: ''};
    message: string;
    sessionExpired: boolean;

    constructor(private securityService: SecurityService,
                private route: ActivatedRoute,
                private router: Router,
                private authGuard: AuthGuard) {
    }

    ngOnInit() {
        if (this.route.snapshot.queryParams['expired']) {
            this.sessionExpired = this.route.snapshot.queryParams['expired'].toLowerCase() == 'true';
        }
    }

    login() {
        this.securityService.authenticate(this.credentials).subscribe((url: string) => {
            this.router.navigate(['/start']);
        }, err => {
            this.message = 'Invalid credentials'
        });
    }

    navigateToRegister() {
        this.router.navigate(['/register']);
    }

}
