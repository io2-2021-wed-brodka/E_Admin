import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BikeStationDTO, CreateStationRequestDTO} from "../../generated/dto";

@Injectable()
export class BikeStationService {

    constructor(private http: HttpClient) {
    }

    getAllBikeStations(): Observable<BikeStationDTO[]> {
        return this.http.get<BikeStationDTO[]>("/api/stations");
    }

    addBikeStation(createStationRequestDTO: CreateStationRequestDTO): Observable<any>  {
        return this.http.post("/api/stations", createStationRequestDTO);
    }

}
