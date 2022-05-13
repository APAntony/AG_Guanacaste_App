import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProgramTypesService } from '../services/program-types.service';
import { ProgramsService } from '../services/programs.service';

@Component({
  selector: 'app-listed-programs',
  templateUrl: './listed-programs.component.html',
  styleUrls: ['./listed-programs.component.scss'],
})
export class ListedProgramsComponent implements OnInit {

  private _programs: any[];
  public get Programs(): any[] {
    return this._programs;
  }

  private _filter: string;
  public get Filter(): string {
    return this._filter;
  }
  public set Filter(filter: string) {
    this._filter = filter;
  }

  private _id_program_type: string;
  public get Type(): string {
    return this._id_program_type;
  }
  public set Type(type: string) {
    this._id_program_type = type;
  }

  private _types: any[];
  public get Types(): any[] {
    return this._types;
  }

  constructor(
    private programTypesService: ProgramTypesService,
    private programsServices: ProgramsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getTypes();
    this.getPrograms(0, 10);
  }

  sendProgram(id: any) {
    this.router.navigate(['/program-detail', id]);
  }

  private getTypes() {
    this.programTypesService.list().toPromise().then(result => {
      this._types = result.data;
    }).catch(e => {

    })
  } 

  private getPrograms(page, size, filter = '', id_program_type = '') {
    this.programsServices.list({
      page: page,
      size: size,
      filter: filter,
      id_education_program_type: id_program_type,
    }).subscribe(result => {
      if (result.success) {
        this._programs = result.data;
      }
    });
  }

  public onChangeType(event) {
    this._id_program_type = event.detail.value;
    console.log(this._id_program_type)
    this.getPrograms(0, 10, this._filter, this._id_program_type);
  }

  public onSearch() {
    this.getPrograms(0, 10, this._filter, this._id_program_type);
  }

  public onClearSearch() {
    this._filter = '';
    this.getPrograms(0, 10, this._filter, this._id_program_type);
  }
}
