import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CreateTechRequestDTO, TechListDTO, UserDTO} from '../../generated/dto';

@Injectable()
export class TechService {

    constructor(private http: HttpClient) {
    }

    getAllTechs(): Observable<TechListDTO> {
        return this.http.get<TechListDTO>("/api/techs");
    }


    addTech(createTechRequestDTO: CreateTechRequestDTO): Observable<any>  {
        return this.http.post("/api/techs", createTechRequestDTO);
    }


    deleteTech(techId: string): Observable<UserDTO> {
        return this.http.delete<UserDTO>(`/api/techs/${techId}`);
    }

}
