import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AddBikeRequestDTO} from "../../generated/dto";

@Injectable()
export class BikeService {

    constructor(private http: HttpClient) {
    }

    addBike(addBikeRequestDTO: AddBikeRequestDTO) : Observable<any> {
        return this.http.post("/api/bikes", addBikeRequestDTO);
    }

}
