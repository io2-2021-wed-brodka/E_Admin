import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BikeDTO, BikeListDTO, BikeStationDTO, BikeStationListDTO, CreateStationRequestDTO, MessageResponseDTO} from '../../generated/dto';

@Injectable()
export class BikeStationService {

    constructor(private http: HttpClient) {
    }

    getAllBikeStations(): Observable<BikeStationListDTO> {
        return this.http.get<BikeStationListDTO>("/api/stations");
    }

    getBikesInStation(stationId: string): Observable<BikeListDTO> {
        return this.http.get<BikeListDTO>(`/api/stations/${stationId}/bikes`);
    }

    addBikeStation(createStationRequestDTO: CreateStationRequestDTO): Observable<any>  {
        return this.http.post("/api/stations", createStationRequestDTO);
    }

    blockStation(stationId: string): Observable<BikeStationDTO> {
        return this.http.post<BikeStationDTO>(`/api/stations/blocked`, stationId);
    }

    unblockStation(stationId: string): Observable<MessageResponseDTO> {
        return this.http.delete<MessageResponseDTO>(`/api/stations/blocked/${stationId}`);
    }

    deleteStation(stationId: string): Observable<MessageResponseDTO> {
        return this.http.delete<MessageResponseDTO>(`/api/stations/${stationId}`);
    }

}
