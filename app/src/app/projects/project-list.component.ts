import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { ProjectService } from './project.service';
import { Utils } from '../utils/utils';
import { Project } from './project';

@Component({
  selector: "app-projects",
  templateUrl: "project-list.component.html"
})
export class ProjectListComponent implements OnInit {
  displayedColumns = ["name"];
  error: string;
  dataSource = new MatTableDataSource();
  projects: Project[];

  constructor(private _projectService: ProjectService) {}

  ngOnInit() {
    this._projectService.getProjects().subscribe(projects => {
      this.projects = projects!;
      this.dataSource.data = projects!;
    }, error => Utils.formatError(error));
  }
}
