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

    bikes: BikeDTO[];
    selectedBike: BikeDTO;
    loadedStations: BikeStationDTO[];
    stations: BikeStationDTO[];
    selectedStation: BikeStationDTO;
    filter: string;

    ngOnInit(): void {
        this.bikeStationService.getAllBikeStations()
            .subscribe(stations => {
                this.loadedStations = stations;
                this.stations = stations;
            })
    }

    onBikeClick(bike: BikeDTO) {
        this.selectedBike = bike;
    }

    onFilterInput(value: string) {
        this.filter = value;
        this.stations = this.loadedStations.filter(s => s.name.includes(value) || ("" + s.id).startsWith(value))
    }

    onStationClick(s: BikeStationDTO) {
        if(this.selectedStation == s) {
            this.selectedStation = null;
            return;
        }
        this.selectedStation = s;
        this.bikeService.getBikesInStation(s.id)
            .subscribe(bikes => {
                this.bikes = bikes;
            });
    }

    onNoClick() {
        this.selectedBike = null;
    }

    onYesClick() {
        this.bikeService.rentBike(this.selectedBike.id)
            .subscribe(() => {
                this.bikes = this.bikes.filter(b => b.id != this.selectedBike.id);
                this.selectedBike = null;
            })
    }
}
