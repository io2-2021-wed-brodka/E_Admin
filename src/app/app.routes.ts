import {Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {MainComponent} from './main/main.component';
import {StationsComponent} from "./stations/stations.component";
import {AuthGuard} from "./common/guards/auth-guard";

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {
        path: 'start',
        component: MainComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'stations',
                component: StationsComponent
            },
        ]
    },
    {path: '', redirectTo: '/login', pathMatch: 'full'}
];

