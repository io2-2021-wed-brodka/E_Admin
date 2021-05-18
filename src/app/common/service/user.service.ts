import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserListDTO, BlockUserRequestDTO, UserDTO} from '../../generated/dto';

@Injectable()
export class UserService {

    constructor(private http: HttpClient) {
    }

    getAllUsers(): Observable<UserListDTO> {
        return this.http.get<UserListDTO>("/api/users");
    }

    getBlockedUsers(): Observable<UserListDTO> {
        return this.http.get<UserListDTO>(`/api/users/blocked`);
    }


    blockUser(blockUserRequestDTO: BlockUserRequestDTO): Observable<UserDTO> {
        return this.http.post<UserDTO>(`/api/users/blocked`, blockUserRequestDTO);
    }

    unblockUser(userId: number): Observable<UserDTO> {
        return this.http.delete<UserDTO>(`/api/users/blocked/${userId}`);
    }

}
