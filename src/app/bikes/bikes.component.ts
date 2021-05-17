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
    selectedBike: BikeDTO;

    showDeleteBikeDialog = false;

    ngOnInit(): void {
        this.refreshBikes();
    }

    refreshBikes() {
        this.bikeService.getAllBikes().subscribe(bikesResponse => {
            this.displayedBikes = bikesResponse.bikes;
        });
    }

    onDeleteBikeClicked(bike: BikeDTO) {
        this.selectedBike = bike;
        this.showDeleteBikeDialog = true;
    }

    confirmBikeDeletion() {
        this.bikeService.deleteBike(this.selectedBike.id).subscribe(emptyResponse => {
            this.refreshBikes();
            this.selectedBike = undefined;
            this.showDeleteBikeDialog = false;
            this.msgService.success('Successfully deleted bike');
        }, errorResponse => {
            this.msgService.error(errorResponse.error.message);
            this.selectedBike = undefined;
            this.showDeleteBikeDialog = false;
        });
    }

    yieldBikeDeletion() {
        this.selectedBike = undefined;
        this.showDeleteBikeDialog = false;
    }
}
