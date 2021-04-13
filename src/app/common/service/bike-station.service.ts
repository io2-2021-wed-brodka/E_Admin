import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BikeStationDTO} from "../../generated/dto";

@Injectable()
export class BikeStationService {

    constructor(private http: HttpClient) {
    }

    getAllBikeStations(): Observable<BikeStationDTO[]> {
        return this.http.get<BikeStationDTO[]>("/api/stations");
    }

    addBikeStation(bikeStationDTO: BikeStationDTO): Observable<any>  {
        return this.http.post("/api/stations", bikeStationDTO);
    }

}