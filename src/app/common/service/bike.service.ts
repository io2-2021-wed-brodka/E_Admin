import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BikeDTO} from "../../generated/dto";

@Injectable()
export class BikeService {

    constructor(private http: HttpClient) {
    }

    addBike(bikeDTO: BikeDTO) : Observable<any> {
        return this.http.post("/api/bikes", bikeDTO);
    }

}