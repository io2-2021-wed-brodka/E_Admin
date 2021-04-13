import {Component, OnInit} from '@angular/core';
import {SecurityService} from '../common/service/security.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthGuard} from "../common/guards/auth-guard";
import {RegisterService} from "../common/service/register.service";

@Component({
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']

})
export class RegisterComponent implements OnInit {

    credentials = {username: '', password: '', repeatPassword: ''};
    message: string;
    sessionExpired: boolean;

    constructor(private registerService: RegisterService,
                private route: ActivatedRoute,
                private router: Router,
                private authGuard: AuthGuard) {
    }

    register() {

        if(this.credentials.password != this.credentials.repeatPassword) {
            this.message = 'Passwords don\'t match';
            return;
        }

        this.registerService.register(this.credentials).subscribe((url: string) => {
            this.router.navigate(['/start']);
        }, err => {
            this.message = 'User with given username already exists'
        });
    }

    navigateToLogin() {
        this.router.navigate(['/login']);
    }

    ngOnInit() {
    }


}
