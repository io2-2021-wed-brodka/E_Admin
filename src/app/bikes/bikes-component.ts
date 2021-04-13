import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SecurityService} from '../common/service/security.service';
import {AppService} from '../app.service';
import {MsgService} from '../common/service/msg.service';
import {BikeService} from "../common/service/bike.service";
import {BikeDTO, BikeStationDTO} from "../generated/dto";
import {BikeStationService} from "../common/service/bike-station.service";

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
        this.bikeService.getRentedBikes().subscribe(bikes => {
            this.bikes = bikes;
        })
    }

    onBikeClick(bike: BikeDTO) {
        if (this.selectedBike == bike) {
            this.selectedBike = null;
            return;
        }
        this.selectedBike = bike;
        if (!this.loadedStations) {
            this.loadStations();
        }
    }

    onFilterInput(value: string) {
        this.filter = value;
        this.stations = this.loadedStations.filter(s => s.name.includes(value) || ("" + s.id).startsWith(value))
    }

    loadStations() {
        this.bikeStationService.getAllBikeStations()
            .subscribe(stations => {
                this.loadedStations = stations;
                this.stations = stations;
            })
    }

    onStationClick(s: BikeStationDTO) {
        this.selectedStation = s;
    }

    onNoClick() {
        this.selectedStation = null;
    }

    onYesClick() {
        this.bikeService.returnBike(this.selectedBike.id, this.selectedStation.id)
            .subscribe(() => {
                this.bikes = this.bikes.filter(b => b.id != this.selectedBike.id);
                this.selectedStation = null;
                this.selectedBike = null;
            })
    }
}
