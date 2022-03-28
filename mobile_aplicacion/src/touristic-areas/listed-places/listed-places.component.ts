import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TouristicAreasService } from '../services/touristic-areas.service';

@Component({
  selector: 'app-listed-places',
  templateUrl: './listed-places.component.html',
  styleUrls: ['./listed-places.component.scss'],
})
export class ListedPlacesComponent implements OnInit {

  public obejto_lugares: any;
  public lugares: any;
  public form = [
    { val: 'Parques Nacionales', isChecked: false },
    { val: 'Refugios de vida silvestre', isChecked: false },
    { val: 'Estacion experimental', isChecked: false }
  ];

  Filter: string;

  constructor(
    private touristicAreasService: TouristicAreasService,
    private activatedroute: ActivatedRoute
  ) {
    this.obejto_lugares = {}
    this.lugares = []

    this.activatedroute.queryParams.subscribe(params => {
      this.obejto_lugares.page = params.page || 0;
      this.obejto_lugares.size = params.size || 25;
      this.obejto_lugares.filter = params.filter || '';
      this.getTouristicAreas();
    })
  }

  ngOnInit() {}

  getTouristicAreas() {
    this.touristicAreasService.list(this.obejto_lugares).subscribe(result => {
      if (result.success) {
        this.lugares = result.data
        //console.log(this.lugares);
      }
    });
  }
}
