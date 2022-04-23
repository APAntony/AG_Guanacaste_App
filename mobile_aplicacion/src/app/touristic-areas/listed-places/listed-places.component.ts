import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TouristicAreasService } from '../services/touristic-areas.service';

@Component({
  selector: 'app-listed-places',
  templateUrl: './listed-places.component.html',
  styleUrls: ['./listed-places.component.scss'],
})
export class ListedPlacesComponent implements OnInit {

  public objeto_lugares: any;
  public lugares: any;
  public form = [ //Para el filtro
    { val: 'Parques Nacionales', isChecked: false },
    { val: 'Refugios de vida silvestre', isChecked: false },
    { val: 'Estacion experimental', isChecked: false }
  ];

  Filter: string;

  constructor(
    private touristicAreasService: TouristicAreasService,
    private activatedroute: ActivatedRoute,
    private router: Router
  ) {
    this.objeto_lugares = {}
    this.lugares = [] 

    this.activatedroute.queryParams.subscribe(params => {
      this.objeto_lugares.page = params.page || 0;
      this.objeto_lugares.size = params.size || 25;
      this.objeto_lugares.filter = params.filter || '';
      this.getTouristicAreas();
    })
  }

  ngOnInit() {}

  getTouristicAreas() {
    /*this.touristicAreasService.list(this.objeto_lugares).subscribe(result => {
      if (result.success) {
        this.lugares = result.data
        //console.log(this.lugares);
      }
    });*/

    let places: any;
    places = [];

    places.push(
      {
        id: 1,
        name:"A",
        categoria: "Parque",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      }
    );
    places.push(
      {
        id: 2,
        name:"B",
        categoria: "Parque",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      }
    );
    places.push(
      {
        id: 3,
        name:"C",
        categoria: "Volcan",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      }
    );
    places.push(
      {
        id: 4,
        name:"D",
        categoria: "Volcan",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      }
    );
    places.push(
      {
        id: 1,
        name:"E",
        categoria: "Parque",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      }
    );

    this.lugares = places;
  }
}
