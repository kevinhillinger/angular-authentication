import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

import { AccountService } from '../security/account.service';
import { ProjectService } from '../projects/project.service';
import { Utils } from '../utils/utils';
import { Project } from '../projects/project';
import { UserProfile } from '../security/user-profile';
import { AddProjectUserDialogComponent } from './add-project-user-dialog.component';
import { DeleteDialogComponent } from './delete-dialog.component';
import { UserPermission } from '../security/user-permission';

@Component({
  selector: 'app-manage-permissions',
  templateUrl: 'manage-permissions.component.html',
  styleUrls: ['manage-permissions.component.scss']
})
export class ManagePermissionsComponent implements OnInit {
  projectId: number;
  project: Project;
  users: any[] = [];
  displayedColumns = ['username', 'email', 'permission', 'actions'];
  error: string;
  dataSource = new MatTableDataSource();

  constructor(
    private _route: ActivatedRoute,
    private _accountService: AccountService,
    private _projectService: ProjectService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.projectId = parseInt(this._route.snapshot.params['projectId']);

    this._projectService.getProject(this.projectId).subscribe(p => {
      this.project = p;
      this._accountService.getAllUsers().subscribe(users => {
        this._projectService
          .getProjectUsers(this.projectId)
          .subscribe(users => {
            this.users = users;
            this.users.forEach(u => {
              if (u.userPermissions) {
                u.permission = u.userPermissions.find((up: UserPermission) => up.projectId === this.projectId);
              }
            });
            this.dataSource.data = users;
          }, error => (this.error = Utils.formatError(error)));
      }, error => (this.error = Utils.formatError(error)));
    }, error => (this.error = Utils.formatError(error)));
  }

  addUser() {
    const dialogRef = this.dialog.open(AddProjectUserDialogComponent, {
      width: '348px',
      data: { projectId: this.projectId }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.ngOnInit();
      }
    });
  }

  removeUser(user: UserProfile) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '348px',
      data: {
        entityName: 'User',
        message: `Are you sure you want to remove user ${user.firstName} ${user.lastName} from this project?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this._projectService
          .removeUserPermission(user.id, this.projectId)
          .subscribe(() => {
            this.users.splice(this.users.indexOf((u: UserProfile) => u.id === user.id), 1);
            this.dataSource.data = this.users;
          }, error => (this.error = Utils.formatError(error)));
      }
    });
  }

  onPermissionChanged(user: any) {
    this._projectService.updateUserPermission(user.permission).subscribe(() => {

    }, error => { this.error = Utils.formatError(error)});
  }
}
