import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SecurityService} from '../common/service/security.service';
import {AppService} from '../app.service';
import {MsgService} from '../common/service/msg.service';
import {UserDTO, UserStatus} from '../generated/dto';
import {UserService} from '../common/service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private securityService: SecurityService,
              private app: AppService,
              private router: Router,
              private msgService: MsgService,
              private userService: UserService) {
  }

  allUsers: UserDTO[];
  displayedUsers: UserDTO[];
  user: UserDTO;

  showUserStateChangeConfirmationDialog: boolean;

  ngOnInit(): void {
    this.refreshUsers();
  }

  refreshUsers() {
    this.userService.getAllUsers()
        .subscribe(users => {
          this.allUsers = users.users;
          this.displayedUsers = users.users;
        });
  }

  onUserChangeStateClick(userDTO: UserDTO) {
    this.user = userDTO;
    this.showUserStateChangeConfirmationDialog = true;
  }

  onUserChangeStateConfirm() {
    if (this.isUserBlocked(this.user)) {
      this.userService.unblockUser(this.user.id).subscribe(result => {
        this.refreshUsers();
      });
    } else {
      this.userService.blockUser({id: this.user.id}).subscribe(result => {
        this.refreshUsers();
      });
    }

    this.showUserStateChangeConfirmationDialog = false;
  }

  onUserChangeStateCancel() {
    this.showUserStateChangeConfirmationDialog = false;
  }

  isUserBlocked(s: UserDTO) {
    return s.status === UserStatus.BLOCKED;
  }
}
