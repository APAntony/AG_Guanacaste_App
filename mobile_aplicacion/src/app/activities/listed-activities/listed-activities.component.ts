import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccessibilitiesService } from '../services/accessibilities.service';
import { ActivitiesService } from '../services/activities.service';
import { ActivityTypesService } from '../services/activity-types.service';
import { DifficultiesService } from '../services/difficulties.service';

@Component({
  selector: 'app-listed-activities',
  templateUrl: './listed-activities.component.html',
  styleUrls: ['./listed-activities.component.scss'],
})
export class ListedActivitiesComponent implements OnInit {


  private _places: any[];
  public get Places(): any[] {
    return this._places;
  }

  private _filter: string;
  public get Filter(): string {
    return this._filter;
  }
  public set Filter(filter: string) {
    this._filter = filter;
  }


  private _id_difficulty: string;
  public get Difficulty(): string {
    return this._id_difficulty;
  }
  public set Difficulty(type: string) {
    this._id_difficulty = type;
  }

  private _id_activity_type: string;
  public get Type(): string {
    return this._id_activity_type;
  }
  public set Type(type: string) {
    this._id_activity_type = type;
  }

  private _id_accessbility: string;
  public get Accesibility(): string {
    return this._id_accessbility;
  }
  public set Accesibility(type: string) {
    this._id_accessbility = type;
  }

  private _difficulties: any[];
  public get Difficulties(): any[] {
    return this._difficulties;
  }

  private _types: any[];
  public get Types(): any[] {
    return this._types;
  }

  private _accesibilities: any[];
  public get Accesibilities(): any[] {
    return this._accesibilities;
  }

  private _near: any
  public get Near(): any {
    return this._near;
  }

  constructor(
    private activitiesService: ActivitiesService,
    private difficultiesService: DifficultiesService,
    private activityTypeService: ActivityTypesService,
    private accessibilitiesServices: AccessibilitiesService,
    private activatedroute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this._near = this.router.getCurrentNavigation().extras.state;
    this.getActivities(0, 10);
    this.getDifficulties();
    this.getTypes();
    this.getAccessibilities();
  }

  sendActivity(id: any) {
    this.router.navigate(['/activity-detail', id]);
  }

  private getDifficulties() {
    this.difficultiesService.list().toPromise().then(result => {
      this._difficulties = result.data;
    }).catch(e => {

    })
  }

  private getTypes() {
    this.activityTypeService.list().toPromise().then(result => {
      this._types = result.data;
    }).catch(e => {

    })
  }

  private getAccessibilities() {
    this.accessibilitiesServices.list().toPromise().then(result => {
      this._accesibilities = result.data;
    }).catch(e => {

    })
  }

  private getActivities(page, size, filter = '', id_difficulty = '', id_activity_type = '', id_accessibility = '') {
    let geom = '';

    if(this._near){
      geom = JSON.stringify(this._near.geom);
    }
    this.activitiesService.list({
      page: page,
      size: size,
      filter: filter,
      id_difficulty: id_difficulty,
      id_activity_type: id_activity_type,
      id_accessibility: id_accessibility,
      geom: geom
    }).subscribe(result => {
      if (result.success) {
        this._places = result.data;
      }
    });
  }

  public onChangeType(event) {
    this._id_activity_type = event.detail.value;
    this.getActivities(0, 10, this._filter, this._id_difficulty, this._id_activity_type, this._id_accessbility);
  }

  public onChangeDifficulty(event) {
    this._id_difficulty = event.detail.value;
    this.getActivities(0, 10, this._filter, this._id_difficulty, this._id_activity_type, this._id_accessbility);
  }

  public onChangeAccesibility(event) {
    this._id_accessbility = event.detail.value;
    this.getActivities(0, 10, this._filter, this._id_difficulty, this._id_activity_type, this._id_accessbility);
  }

  public onSearch() {
    this.getActivities(0, 10, this._filter, this._id_difficulty, this._id_activity_type, this._id_accessbility);
  }

  public onClearSearch() {
    this._filter = '';
    this.getActivities(0, 10, this._filter, this._id_difficulty, this._id_activity_type, this._id_accessbility);
  }

  public makeTitle(){
    if(this._near){
      return `Qué hacer cerca de ${this._near.name}`
    }
    return 'Qué hacer'
  }

}
