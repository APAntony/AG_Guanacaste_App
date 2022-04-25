import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivitiesService } from '../services/activities.service';

@Component({
  selector: 'app-listed-activities',
  templateUrl: './listed-activities.component.html',
  styleUrls: ['./listed-activities.component.scss'],
})
export class ListedActivitiesComponent implements OnInit {

  public queryActividades: any;
  actividades: any;  
  grid: Array<Array<string>>; //array of arrays

  Filter: string;
  
  constructor(
    private activitiesService: ActivitiesService,
    private activatedroute: ActivatedRoute,
    private router: Router
  ) {
    this.queryActividades = {}
    this.actividades = []
    this.grid = [];

    this.activatedroute.queryParams.subscribe(params => {
      this.queryActividades.page = params.page || 0;
      this.queryActividades.size = params.size || 5;
      this.queryActividades.filter = params.filter || '';
      this.getActividades();
    })

    /*
    this.actividades = [
      {url: "../../../assets/canopy.jpg", name: "imagen 1"},
      {url: "../../../assets/canopy.jpg", name: "imagen 2"},
      {url: "../../../assets/canopy.jpg", name: "imagen 3"},
      {url: "../../../assets/canopy.jpg", name: "imagen 4"},
      {url: "../../../assets/canopy.jpg", name: "imagen 5"},
      {url: "../../../assets/canopy.jpg", name: "imagen 6"},
      {url: "../../../assets/canopy.jpg", name: "imagen 7"}
    ]*/
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
    console.log("Actividades")
    console.log(this.actividades)
  }

  getActividades() {
    this.activitiesService.list(this.queryActividades).subscribe(result => {
      if (result.success) {
        this.actividades = result.data;
        //console.log(this.tmpActivities);
        //this.getImages()
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
}
