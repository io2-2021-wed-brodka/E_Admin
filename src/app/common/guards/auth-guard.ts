import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {SecurityService} from '../service/security.service';
import {Observable} from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private router: Router,
                private securityService: SecurityService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if(this.securityService.token) {
            return true;
        }
        this.router.navigate(['login'])
        return false;
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if(this.securityService.token) {
            return true;
        }
        this.router.navigate(['login'])
        return false;
    }

}
