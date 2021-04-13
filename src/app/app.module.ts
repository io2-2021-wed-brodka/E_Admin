import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {routes} from './app.routes';
import {RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ErrorComponent} from './error/error.component';
import {AuthGuard} from './common/guards/auth-guard';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {registerLocaleData} from '@angular/common';
import localePl from '@angular/common/locales/pl';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {
    AutoCompleteModule,
    CalendarModule,
    CheckboxModule,
    ConfirmDialogModule,
    DropdownModule,
    FileUploadModule,
    InputSwitchModule,
    InputTextareaModule,
    MenuModule,
    MessagesModule,
    MultiSelectModule,
    ScrollPanelModule,
    SelectButtonModule,
    SpinnerModule,
    SplitButtonModule,
    TabViewModule,
    ToolbarModule,
    TooltipModule,
    TriStateCheckboxModule
} from 'primeng/primeng';
import {PanelModule} from 'primeng/panel';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DialogModule} from 'primeng/dialog';
import {TreeModule} from 'primeng/tree';
import {SliderModule} from 'primeng/slider';
import {CardModule} from 'primeng/card';
import {NgxSpinnerModule} from 'ngx-spinner';
import {AppService} from './app.service';
import {GrowlModule} from 'primeng/growl';
import {MainComponent} from "./main/main.component";
import {MenuComponent} from "./menu/menu.component";
import {MsgService} from "./common/service/msg.service";
import {SecurityService} from "./common/service/security.service";
import {BikesComponent} from "./bikes/bikes-component";
import {StationsComponent} from "./stations/stations.component";
import {RegisterComponent} from "./register/register-component";
import {BikeStationService} from "./common/service/bike-station.service";
import {AuthInterceptor} from "./common/interceptors/auth-interceptor";
import {RegisterService} from "./common/service/register.service";
import {BikeService} from "./common/service/bike.service";

registerLocaleData(localePl, 'pl');

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        ErrorComponent,
        MainComponent,
        MenuComponent,
        BikesComponent,
        StationsComponent,
        RegisterComponent
    ],
    imports: [
        HttpClientModule,
        RouterModule.forRoot(routes),
        FormsModule,
        TableModule,
        PanelModule,
        ToolbarModule,
        TabViewModule,
        MultiSelectModule,
        BrowserAnimationsModule,
        DropdownModule,
        TriStateCheckboxModule,
        CalendarModule,
        InputSwitchModule,
        DialogModule,
        TreeModule,
        SliderModule,
        SplitButtonModule,
        CardModule,
        CheckboxModule,
        CalendarModule,
        AutoCompleteModule,
        FileUploadModule,
        TableModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        InputTextModule,
        MessagesModule,
        GrowlModule,
        NgxSpinnerModule,
        InputTextModule,
        ScrollPanelModule,
        CardModule,
        SpinnerModule,
        MenuModule,
        SelectButtonModule,
        TooltipModule,
        InputTextareaModule,
        ConfirmDialogModule
    ],
    providers: [
        AppService,
        AuthGuard,
        MsgService,
        SecurityService,
        BikeStationService,
        RegisterService,
        BikeService,
        {
            provide : HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi   : true,
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}


