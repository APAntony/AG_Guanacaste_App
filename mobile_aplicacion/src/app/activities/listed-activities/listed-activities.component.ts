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

  public queryActividades: any;
  allActivities: any;
  actividades: any;
  difficulties: any;
  activity_types: any;
  accessibilities: any;
  grid: Array<Array<string>>; //array of arrays

  Filter: string;
  
  constructor(
    private activitiesService: ActivitiesService,
    private difficultiesService: DifficultiesService,
    private activityTypeService: ActivityTypesService,
    private accessibilitiesServices: AccessibilitiesService,
    private activatedroute: ActivatedRoute,
    private router: Router
  ) {
    this.queryActividades = {}
    this.actividades = []
    this.allActivities = []
    this.grid = [];

    this.activatedroute.queryParams.subscribe(params => {
      this.queryActividades.page = params.page || 0;
      this.queryActividades.size = params.size || 5;
      this.queryActividades.filter = params.filter || '';
      this.getActividades();
    })

    this.getCategories();
  }

  ngOnInit() {
    this.grid = Array(Math.ceil(this.actividades.length/2)); //MATHS!
  }

  ionViewDidEnter() {
    let rowNum = 0; //counter to iterate over the rows in the grid
  
    for (let i = 0; i < this.actividades.length; i+=2) { //iterate images
  
      this.grid[rowNum] = Array(2); //declare two elements per row
  
      if (this.actividades[i] !== undefined) { //check file URI exists
        this.grid[rowNum][0] = this.actividades[i] //insert image
      }
  
      if (this.actividades.length > (i+1)) { //repeat for the second image
        this.grid[rowNum][1] = this.actividades[i+1]
      }

      if (this.actividades.length <= (i+1)) {
        break;
      }
  
      rowNum++; //go on to the next row
    }

    if (this.actividades.length%2 == 1) {
      this.grid[(this.grid.length-1)].pop();
    }
    //console.log(this.actividades[0]);
    //console.log(this.grid[2])
  }

  getActividades() {
    this.activitiesService.list(this.queryActividades).subscribe(result => {
      if (result.success) {
        this.actividades = result.data;
        this.allActivities = result.data;
        //console.log(this.tmpActivities);
        //this.getImages()
      }
    });
  }

  putNewGrid() {
    let rowNum = 0; //counter to iterate over the rows in the grid
  
    for (let i = 0; i < this.actividades.length; i+=2) { //iterate images
  
      this.grid[rowNum] = Array(2); //declare two elements per row
  
      if (this.actividades[i] !== undefined) { //check file URI exists
        this.grid[rowNum][0] = this.actividades[i] //insert image
      }
  
      if (this.actividades.length > (i+1)) { //repeat for the second image
        this.grid[rowNum][1] = this.actividades[i+1]
      }

      if (this.actividades.length <= (i+1)) {
        break;
      }
  
      rowNum++; //go on to the next row
    }

    if (this.actividades.length%2 == 1) {
      this.grid[(this.grid.length-1)].pop();
    }
  }

  getCategories() {
    this.difficultiesService.list().subscribe(res => {
      if (res.success) {
        this.difficulties = res.data;
      }
    });

    this.activityTypeService.list().subscribe(res => {
      if (res.success) {
        this.activity_types = res.data;
      }
    });

    this.accessibilitiesServices.list().subscribe(res => {
      if (res.success) {
        this.accessibilities = res.data;
      }
    });
  }

  sendActivity(item: any) {
    history.pushState({data: item}, '', '');
    this.router.navigate(['/activity-detail'], {state:{item}});
    /*
    this.activitiesService.find(id).subscribe(result => {
      if (result.success) {
        history.pushState({data: result}, '', '');
        this.router.navigate(['/activity-detail'], {state:{result}});
        return result;
      }
    });*/
  }

  onFilter(event) : void {
    console.log("radioSelect", event);
    console.log(event.detail.value.split(","))

    this.actividades = this.allActivities;

    let category: string = event.detail.value.split(",")[0];
    let tipo: string = event.detail.value.split(",")[1];
    console.log(this.actividades);

    if (category == undefined) {
      return;
    }

    if (tipo == "diff") {
      this.actividades = this.actividades.filter((item) => {
        return item.difficulty.name.toLowerCase().indexOf(category.toLowerCase()) > -1;
      });   
      console.log("Largo ahora: " + this.actividades.length)   
    } else if (tipo == "tipo") {
      this.actividades = this.actividades.filter((item) => {
        return item.activity_type.name.toLowerCase().indexOf(category.toLowerCase()) > -1;
      });
    } else {
      this.actividades = this.actividades.filter((item) => {
        return item.accessibility.name.toLowerCase().indexOf(category.toLowerCase()) > -1;
      });
    }
    
    this.grid = Array(Math.ceil(this.actividades.length/2)); //MATHS!
    this.putNewGrid();
    console.log(this.actividades.length)
  }
}
