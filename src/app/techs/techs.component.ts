import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SecurityService} from '../common/service/security.service';
import {AppService} from '../app.service';
import {MsgService} from '../common/service/msg.service';
import {CreateTechRequestDTO, BlockUserRequestDTO, TechListDTO, UserStatus, UserDTO} from '../generated/dto';
import {UserService} from '../common/service/user.service';
import {TechService} from '../common/service/tech.service';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-techs',
    templateUrl: './techs.component.html',
    styleUrls: ['./techs.component.scss']
})
export class TechsComponent implements OnInit {

    constructor(private securityService: SecurityService,
                private app: AppService,
                private router: Router,
                private msgService: MsgService,
                private userService: UserService,
                private techService: TechService) {
    }

    allTechs: UserDTO[];
    displayedTechs: UserDTO[];
    tech: UserDTO;

    createTechRequestDTO: CreateTechRequestDTO;


    showAddTechConfirmDialog: boolean;
    showDeleteTechConfirmDialog: boolean;
    showTechStateChangeConfirmationDialog: boolean;

    ngOnInit(): void {
        this.refreshTechs();
    }

    refreshTechs() {
        this.techService.getAllTechs()
            .subscribe(techs => {
                this.allTechs = techs.techs;
                this.displayedTechs = techs.techs;
            });
    }


    onAddTechClick() {
        this.createTechRequestDTO = {name: "", password: "****"};
        this.showAddTechConfirmDialog = true;
    }

    onAddTechConfirm() {
        if (this.validateCreateTechRequest(this.createTechRequestDTO)) {
            this.techService.addTech(this.createTechRequestDTO).subscribe(result => {
                this.refreshTechs();
            });
        }
        this.showAddTechConfirmDialog = false;
    }

    onAddTechCancel() {
        this.createTechRequestDTO = null;
        this.showAddTechConfirmDialog = false;
    }

    onTechChangeStateClick(userDTO: UserDTO) {
        this.tech = userDTO;
        this.showTechStateChangeConfirmationDialog = true;
    }

    onTechChangeStateConfirm() {
        if (this.isTechBlocked(this.tech)) {
            this.userService.unblockUser(this.tech.id).subscribe(result => {
                this.refreshTechs();
            });
        } else {
            this.userService.blockUser({id: this.tech.id}).subscribe(result => {
                this.refreshTechs();
            });
        }

        this.showTechStateChangeConfirmationDialog = false;
    }

    onTechChangeStateCancel() {
        this.showTechStateChangeConfirmationDialog = false;
    }

    onDeleteTechClick(userDTO: UserDTO) {
        this.tech = userDTO;
        this.showDeleteTechConfirmDialog = true;
    }

    onDeleteTechCancel() {
        this.showDeleteTechConfirmDialog = false;
    }

    onDeleteTechConfirm() {
        this.techService.deleteTech(this.tech.id).subscribe(result => {
            this.refreshTechs();
        });

        this.showDeleteTechConfirmDialog = false;
    }

    validateCreateTechRequest(createTechRequestDTO: CreateTechRequestDTO): boolean {
        if (createTechRequestDTO == null) {
            return false;
        }
        if (createTechRequestDTO.name == null || createTechRequestDTO.name.length == 0) {
            return false;
        }
        if (createTechRequestDTO.password == null || createTechRequestDTO.password.length <= 0) {
            return false;
        }
        return true;
    }


    isTechBlocked(s: UserDTO) {
        return s.status === UserStatus.BLOCKED;
    }
}
