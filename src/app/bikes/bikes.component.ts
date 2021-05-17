import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SecurityService} from '../common/service/security.service';
import {AppService} from '../app.service';
import {MsgService} from '../common/service/msg.service';
import {BikeService} from '../common/service/bike.service';
import {BikeDTO} from '../generated/dto';

@Component({
    selector: 'app-bikes',
    templateUrl: './bikes.component.html',
    styleUrls: ['./bikes.component.scss']
})
export class BikesComponent implements OnInit {

    constructor(private securityService: SecurityService,
                private app: AppService,
                private router: Router,
                private msgService: MsgService,
                private bikeService: BikeService) {
    }

    displayedBikes: BikeDTO[];

    filter: string;

    ngOnInit(): void {
        console.log('refreshing bikes');
        this.refreshBikes();
    }

    refreshBikes() {
        this.bikeService.getAllBikes().subscribe(bikesResponse => {
            this.displayedBikes = bikesResponse.bikes;
        });
    }
}
