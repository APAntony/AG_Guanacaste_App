import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.scss'],
})
export class PlaceDetailComponent implements OnInit {

  public lugar: any;
  comments = [];
  message: string;

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    this.lugar = history.state;
    //console.log(this.lugar.item.description);
  }

  backHome() {
    this.router.navigate(['/main-menu'])
  }

  sendComment() {
    console.log("["+this.message+"]");
    if (this.message == undefined) {
      return;
    } 
    
    if (!this.tieneTexto(this.message)) {
      return;
    } 
    
    else {
      let d = new Date();
      this.comments.push({message: this.message});
    }
  }

  eventHandler(keyCode) {
    if (keyCode === 13) {
      this.sendComment();
      this.message = "";
    }
  }

  tieneTexto(texto: string) {
    let letras = "abcdefghyjklmnñopqrstuvwxyz"
    let texto_lower: string;
    texto_lower = texto.toLowerCase()

    let index = 0;

    for (index; index < letras.length; index++) {
      if (texto_lower.includes(letras.charAt(index))) {
        return true;
      }
    }

    return false;
  }
}
