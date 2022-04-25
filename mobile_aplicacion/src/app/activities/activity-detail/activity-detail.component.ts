import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserService } from 'src/app/core/services/user/user.service';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss'],
})
export class ActivityDetailComponent implements OnInit {

  public queryComments: any;
  public primerImg: any;
  public actividad: any;
  tpmComments = [];
  comments = [];
  message: string;
  images: any;

  constructor(
    private router: Router,
    private user: UserService,
    private activatedroute: ActivatedRoute,
    private commentService: CommentService,
    private toastController: ToastController
  ) {
    this.images = [];
    this.queryComments = {}
  }

  ngOnInit() {
    this.actividad = history.state.item;

    console.log("Actividad")
    console.log(this.actividad)

    this.activatedroute.queryParams.subscribe(params => {
      this.queryComments.page = params.page || 0;
      this.queryComments.size = params.size || 5;
      this.queryComments.filter = params.filter || '';
      this.getComments();
    })
  }

  ionViewWillEnter() {
    let i = 0;

    for(i; i <this.actividad.activity_images.length; i++) {
      this.images.push(this.actividad.activity_images[i]);
    }

    this.primerImg = this.images[0].url;
  }

  backHome() {
    this.router.navigate(['/main-menu'])
  }

  sendComment() {
    if (!this.user.isLogin()) {
      this.presentToast();
      return;
    }

    console.log("["+this.message+"]");
    if (this.message == undefined) {
      return;
    } 
    
    if (!this.tieneTexto(this.message)) {
      return;
    }

    this.createComment({"comment": this.message, "id_user": this.user.getUserId()});
    this.comments.push({message: this.message, usuario: this.user.getUserName()});
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

  getComments() {
    this.commentService.list(this.actividad.id, this.queryComments).subscribe(result => {
      this.tpmComments = result.data;
      this.buildComments();
    });
  }

  buildComments() {
    let i = 0;

    for (i; i < this.tpmComments.length; i++) {
      
      this.comments.push({
        message: this.tpmComments[i].comment,
        usuario: this.tpmComments[i].user.name
      })
    }
  }

  createComment(body: any) {
    this.commentService.create(this.actividad.id, body).subscribe(result => {
      if (result.success) {
        console.log("Exito")
      } else {
        console.log("Fracaso")
      }
    })
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: "Debes tener una sesión iniciada para comentar",
      duration: 2000
    });

    toast.present();
  }
}
