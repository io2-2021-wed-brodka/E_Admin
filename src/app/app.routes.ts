import {Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {MainComponent} from './main/main.component';
import {StationsComponent} from './stations/stations.component';
import {TechsComponent} from './techs/techs.component';
import {AuthGuard} from './common/guards/auth-guard';
import {BikesComponent} from './bikes/bikes.component';

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
            {
                path: 'techs',
                component: TechsComponent
            },
            {
                path: 'bikes',
                component: BikesComponent
            },
        ]
    },
    {path: '', redirectTo: '/login', pathMatch: 'full'}
];

