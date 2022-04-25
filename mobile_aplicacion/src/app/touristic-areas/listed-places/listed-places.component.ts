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
  public allPlaces: any;
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
    this.allPlaces = []

    this.activatedroute.queryParams.subscribe(params => {
      this.objeto_lugares.page = params.page || 0;
      this.objeto_lugares.size = params.size || 25;
      this.objeto_lugares.filter = params.filter || '';
      this.getTouristicAreas();
    })
  }

  ngOnInit() {}

  sendTouristicArea(id: number) {
    this.touristicAreasService.find(id.toString()).subscribe(result =>{
      if (result.success) {
        history.pushState({data: result}, '', '');
        this.router.navigate(['/place-detail'], {state:{result}});
        return result;
      } 
    });
  }

  getTouristicAreas() {
    this.touristicAreasService.list(this.objeto_lugares).subscribe(result => {
      if (result.success) {
        this.lugares = result.data
        this.allPlaces = result.data
        console.log(this.lugares[0]);
      }
    });
  }

  onFilter(event) : void {
    //console.log("radioSelect", event);
    
    this.lugares = this.allPlaces;

    let category: string = event.detail.value;

    if (category == undefined) {
      return;
    }
    
    // Only filter the technologies array IF the selection is NOT equal to value of all
    if (category.trim() !== 'all') {
      this.lugares = this.lugares.filter((item) => {
        return item.type_tourist_area.name.toLowerCase().indexOf(category.toLowerCase()) > -1;
      });
    }
    
    //console.log(this.lugares.length)
  }
}
