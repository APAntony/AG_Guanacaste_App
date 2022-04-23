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
      //console.log(this.actividades[i])
      //console.log(this.actividades[i+1])
      //console.log("Pos: "+i.toString())
      //console.log("Pos: "+(i+1).toString())
      //console.log("\n")
  
      this.grid[rowNum] = Array(2); //declare two elements per row
  
      if (this.actividades[i] !== undefined) { //check file URI exists
        this.grid[rowNum][0] = this.actividades[i] //insert image
      }
  
      if (this.actividades.length > (i+1)) {//this.actividades[i+1] !== undefined) { //repeat for the second image
        //console.log("Murio?")
        this.grid[rowNum][1] = this.actividades[i+1]
      }

      if (this.actividades.length <= (i+1)) {
        //console.log("Entro?")
        break;
      }
  
      rowNum++; //go on to the next row
    }
  }
}
