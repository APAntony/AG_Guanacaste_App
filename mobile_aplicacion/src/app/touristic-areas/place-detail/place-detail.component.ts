import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LoaderService } from '@core/services';
import { LoadingController, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/core/services/user/user.service';
import { CommentService } from '../services/comment.service';
import { TouristicAreasService } from '../services/touristic-areas.service';
//import {DomSanitanizationService} from '@angular/platform-browser';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.scss'],
})
export class PlaceDetailComponent implements OnInit {

  private _place: any;
  public get Place(): any {
    return this._place;
  }

  private _loading: boolean;
  public get Loading(): boolean {
    return this._loading;
  }

  private _comments: any[];
  public get Comments(): any[] {
    return this._comments;
  }

  private _comment: string;
  public get Comment(): string {
    return this._comment;
  }
  public set Comment(text: string) {
    this._comment = text;
  }


  private _page: string;

  private _id: string;

  constructor(
    private router: Router,
    private user: UserService,
    private activatedroute: ActivatedRoute,
    private commentService: CommentService,
    private toastController: ToastController,
    private touristicAreaService: TouristicAreasService,
    private loaderService: LoaderService
  ) {
    this._id = this.activatedroute.snapshot.paramMap.get('id');
    this._loading = true;
    this._place = {};
    this._page = '0';
  }

  ngOnInit() {
    this.loaderService.present("Cargando");

    this.touristicAreaService.find(this._id).toPromise().then(result => {
      this.loaderService.dismiss();
      if (result.success) {
        this._place = result.data;
      }
      this._loading = false;
    }).catch(err => {

    });


    this.commentService.list(this._id, {
      page: this._page,
      size: 10
    }).toPromise().then(result => {
      if (result.success) {
        this._comments = result.data;
      }
    });
  }

  public send() {
    console.log(this._comment);
    this.commentService.create(this._id, {
      comment: this._comment,
      id_user: this.user.getUserId()
    }).toPromise().then(result => {
      if (result.success) {
        result.data.user = {
          name: this.user.getUserName()
        };
        this._comments = [result.data].concat(this._comments);
        this._comment = '';
      }
    }).catch(err => {

    })
  }
}
