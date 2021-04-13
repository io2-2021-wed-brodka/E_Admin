import {Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {MainComponent} from './main/main.component';
import {BikesComponent} from "./bikes/bikes-component";
import {StationsComponent} from "./stations/stations.component";
import {RegisterComponent} from "./register/register-component";
import {AuthGuard} from "./common/guards/auth-guard";

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {
        path: 'start',
        component: MainComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'bikes',
                component: BikesComponent
            },
            {
                path: 'stations',
                component: StationsComponent
            },
        ]
    },
    {path: '', redirectTo: '/login', pathMatch: 'full'}
];

