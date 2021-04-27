import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SecurityService} from '../common/service/security.service';
import {AppService} from '../app.service';
import {MsgService} from '../common/service/msg.service';
import {BikeService} from "../common/service/bike.service";
import {AddBikeRequestDTO, BikeDTO, BikeStationDTO, CreateStationRequestDTO} from "../generated/dto";
import {BikeStationService} from "../common/service/bike-station.service";
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-stations',
    templateUrl: './stations.component.html',
    styleUrls: ['./stations.component.scss']
})
export class StationsComponent implements OnInit {

    constructor(private securityService: SecurityService,
                private app: AppService,
                private router: Router,
                private msgService: MsgService,
                private bikeService: BikeService,
                private bikeStationService: BikeStationService) {
    }

    allStations: BikeStationDTO[];
    displayedStations: BikeStationDTO[];
    stationDTO: BikeStationDTO;

    createStationRequestDTO: CreateStationRequestDTO;
    addBikeRequestDTO: AddBikeRequestDTO;

    filter: string;

    showAddStationConfirmDialog: boolean;
    showAddBikeConfirmDialog: boolean;
    showDeleteStationConfirmDialog: boolean;

    ngOnInit(): void {
        this.refreshStations();
    }

    refreshStations() {
        this.bikeStationService.getAllBikeStations()
            .subscribe(stations => {
                this.allStations = stations;
                this.displayedStations = stations;
            });
    }

    onFilterInput(value: string) {
        this.filter = value;
        this.displayedStations = this.allStations.filter(s =>
            s.name.includes(value) || ("" + s.id).startsWith(value)
        );
    }

    onAddStationClick() {
        this.createStationRequestDTO = {name: "", maxBikes: 1};
        this.showAddStationConfirmDialog = true;
    }

    onAddStationConfirm() {
        if (this.validateCreateStationRequest(this.createStationRequestDTO)) {
            this.bikeStationService.addBikeStation(this.createStationRequestDTO).subscribe(result => {
                this.refreshStations();
                this.onFilterInput(this.filter);
            });
        }
        this.showAddStationConfirmDialog = false;
    }

    onAddStationCancel() {
        this.createStationRequestDTO = null;
        this.showAddStationConfirmDialog = false;
    }

    onAddNewBikeClick(stationDTO: BikeStationDTO) {
        this.addBikeRequestDTO = {stationId: stationDTO.id};
        this.showAddBikeConfirmDialog = true;
    }

    onAddNewBikeConfirm() {
        if (this.validateAddBikeRequest(this.addBikeRequestDTO)) {
            this.bikeService.addBike(this.addBikeRequestDTO).subscribe(result => {});
        }
        this.showAddBikeConfirmDialog = false;
    }

    onAddNewBikeCancel() {
        this.showAddBikeConfirmDialog = false;
    }

    onDeleteStationClick(stationDTO: BikeStationDTO) {
        this.stationDTO = stationDTO;
        this.showDeleteStationConfirmDialog = true;
    }

    onDeleteStationCancel() {
        this.showDeleteStationConfirmDialog = false;
    }

    onDeleteStationConfirm() {
        this.bikeStationService.deleteStation(this.stationDTO.id).subscribe(result => {
            this.refreshStations();
            this.onFilterInput(this.filter);
            this.msgService.warn(result);
        });

        this.showDeleteStationConfirmDialog = false;
    }

    validateCreateStationRequest(createStationRequestDTO: CreateStationRequestDTO): boolean {
        if (createStationRequestDTO == null) {
            return false;
        }
        if (createStationRequestDTO.name == null || createStationRequestDTO.name.length == 0) {
            return false;
        }
        if (createStationRequestDTO.maxBikes == null || createStationRequestDTO.maxBikes <= 0) {
            return false;
        }
        return true;
    }

    validateAddBikeRequest(addBikeRequest: AddBikeRequestDTO): boolean {
        if (addBikeRequest == null) {
            return false;
        }
        if (addBikeRequest.stationId == null || addBikeRequest.stationId <= 0) {
            return false;
        }
        return true;
    }

}
