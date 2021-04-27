import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BikeDTO, BikeStationDTO, CreateStationRequestDTO} from "../../generated/dto";

@Injectable()
export class BikeStationService {

    constructor(private http: HttpClient) {
    }

    getAllBikeStations(): Observable<BikeStationDTO[]> {
        return this.http.get<BikeStationDTO[]>("/api/stations");
    }

    getBikesInStation(stationId: number): Observable<BikeDTO[]> {
        return this.http.get<BikeDTO[]>(`/api/stations/${stationId}/bikes`);
    }

    addBikeStation(createStationRequestDTO: CreateStationRequestDTO): Observable<any>  {
        return this.http.post("/api/stations", createStationRequestDTO);
    }

    deleteStation(stationId: number): Observable<string> {
        return this.http.delete<string>(`/api/stations/${stationId}`);
    }

}
