import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TypesTouristicAreaService } from '../services';
import { TouristicAreasService } from '../services/touristic-areas.service';

@Component({
  selector: 'app-listed-places',
  templateUrl: './listed-places.component.html',
  styleUrls: ['./listed-places.component.scss'],
})
export class ListedPlacesComponent implements OnInit {

  private _types: any[];
  public get Types(): any[] {
    return this._types;
  }

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

  private _id_type: string;
  public get Type(): string {
    return this._id_type;
  }
  public set Type(type: string) {
    this._id_type = type;
  }

  constructor(
    private touristicAreasService: TouristicAreasService,
    private activatedroute: ActivatedRoute,
    private typesTouristicAreaService: TypesTouristicAreaService,
    private router: Router
  ) {
    this._places = [];


  }

  ngOnInit() {
    this.getTypes();
    this.getTouristicAreas(0, 10);
  }

  private getTypes() {
    this.typesTouristicAreaService.list().toPromise().then(result => {
      if (result.success) {
        this._types = result.data;
      }
    }).catch(e => {

    });
  }

  private getTouristicAreas(page, size, filter = '', id_type = '') {
    this.touristicAreasService.list({
      page: page,
      size: size,
      filter: filter,
      id_type_tourist_area: id_type
    }).subscribe(result => {
      if (result.success) {
        this._places = result.data;
      }
    });
  }

  sendTouristicArea(id: number) {
    this.router.navigate(['/place-detail', id]);
  }

  public onClickFilter(event) {
    this._id_type = event.detail.value;
    this.getTouristicAreas(0, 10, this._filter, this._id_type);
  }

  public onSearch() {
    this.getTouristicAreas(0, 10, this._filter, this._id_type);
  }

  public onClearSearch() {
    this._filter = '';
    this._id_type = '';
    this.getTouristicAreas(0, 10);
  }
}
