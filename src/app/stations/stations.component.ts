import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SecurityService} from '../common/service/security.service';
import {AppService} from '../app.service';
import {MsgService} from '../common/service/msg.service';
import {BikeService} from "../common/service/bike.service";
import {BikeDTO, BikeStationDTO} from "../generated/dto";
import {BikeStationService} from "../common/service/bike-station.service";

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
    bikeDTO: BikeDTO;
    filter: string;

    ngOnInit(): void {
        this.bikeStationService.getAllBikeStations()
            .subscribe(stations => {
                this.allStations = stations;
                this.displayedStations = stations;
            })
    }

    onFilterInput(value: string) {
        this.filter = value;
        this.displayedStations = this.allStations.filter(s =>
            s.name.includes(value) || ("" + s.id).startsWith(value)
        );
    }

    onAddStationClick() {
        this.stationDTO = new BikeStationDTO();
    }

    onAddStationConfirm() {
        if (this.validateStationToBeAdded(this.stationDTO)) {
            this.bikeStationService.addBikeStation(this.stationDTO).subscribe(result => {});
        }
        this.stationDTO = null;
    }

    onAddStationCancel() {
        this.stationDTO = null;
    }

    onAddNewBikeClick() {
        this.bikeDTO = new BikeDTO();
    }

    onAddNewBikeConfirm() {
        if (this.validateStationToAddBike(this.stationDTO)) {
            this.bikeService.addBike(this.bikeDTO).subscribe(result => {});
        }
        this.bikeDTO = null;
    }

    onAddNewBikeCancel() {
        this.bikeDTO = null;
    }

    validateStationToBeAdded(stationDto: BikeStationDTO): boolean {
        if (stationDto == null) {
            return false;
        }
        if (stationDto.name == null || stationDto.name.length == 0) {
            return false;
        }
        if (stationDto.maxBikes == null || stationDto.maxBikes <= 0) {
            return false;
        }
        return true;
    }

    validateStationToAddBike(stationDto: BikeStationDTO): boolean {
        if (stationDto == null) {
            return false;
        }
        if (stationDto.id == null || stationDto.id <= 0) {
            return false;
        }
        return true;
    }
}
