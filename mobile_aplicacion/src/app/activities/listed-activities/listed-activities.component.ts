import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listed-activities',
  templateUrl: './listed-activities.component.html',
  styleUrls: ['./listed-activities.component.scss'],
})
export class ListedActivitiesComponent implements OnInit {

  actividades: any;  
  grid: Array<Array<string>>; //array of arrays
  
  constructor() {
    this.actividades = [
      {img: "../../../assets/canopy.jpg", name: "imagen 1"},
      {img: "../../../assets/canopy.jpg", name: "imagen 2"},
      {img: "../../../assets/canopy.jpg", name: "imagen 3"},
      {img: "../../../assets/canopy.jpg", name: "imagen 4"},
      {img: "../../../assets/canopy.jpg", name: "imagen 5"},
      {img: "../../../assets/canopy.jpg", name: "imagen 6"},
      {img: "../../../assets/canopy.jpg", name: "imagen 7"}
    ]

    this.grid = Array(Math.ceil(this.actividades.length/2)); //MATHS!
  }

  ngOnInit() {}

  ionViewWillEnter() {

    let rowNum = 0; //counter to iterate over the rows in the grid
  
    for (let i = 0; i < this.actividades.length; i+=2) { //iterate images
  
      this.grid[rowNum] = Array(2); //declare two elements per row
  
      if (this.actividades[i]) { //check file URI exists
        this.grid[rowNum][0] = this.actividades[i] //insert image
      }
  
      if (this.actividades[i+1]) { //repeat for the second image
        this.grid[rowNum][1] = this.actividades[i+1]
      }
  
      rowNum++; //go on to the next row
    }

    if (this.grid.length%2 == 1) {
      this.grid[-1].pop();
    }
  }
}
