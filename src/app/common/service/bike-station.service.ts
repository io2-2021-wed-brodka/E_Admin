import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BikeDTO, BikeStationDTO, BikeStationListDTO, CreateStationRequestDTO} from '../../generated/dto';

@Injectable()
export class BikeStationService {

    constructor(private http: HttpClient) {
    }

    getAllBikeStations(): Observable<BikeStationListDTO> {
        return this.http.get<BikeStationListDTO>("/api/stations");
    }

    getBikesInStation(stationId: number): Observable<BikeDTO[]> {
        return this.http.get<BikeDTO[]>(`/api/stations/${stationId}/bikes`);
    }

    addBikeStation(createStationRequestDTO: CreateStationRequestDTO): Observable<any>  {
        return this.http.post("/api/stations", createStationRequestDTO);
    }

    blockStation(stationId: number): Observable<BikeStationDTO> {
        return this.http.post<BikeStationDTO>(`/api/stations/blocked`, stationId);
    }

    unblockStation(stationId: number): Observable<string> {
        return this.http.delete<string>(`/api/stations/blocked/${stationId}`);
    }

}
