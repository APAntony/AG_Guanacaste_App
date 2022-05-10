import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '@core/services';
import { ToastController } from '@ionic/angular';
import { UserService } from 'src/app/core/services/user/user.service';
import { ActivitiesService } from '../services/activities.service';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss'],
})
export class ActivityDetailComponent implements OnInit {

  private _activity: any;
  public get Activity(): any {
    return this._activity;
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
    private activityService: ActivitiesService,
    private loaderService: LoaderService
  ) {
    this._id = this.activatedroute.snapshot.paramMap.get('id');
    this._loading = true;
    this._activity = {};
    this._page = '0';
  }

  ngOnInit() {
    this.loaderService.present("Cargando");

    this.activityService.find(this._id).toPromise().then(result => {
      this.loaderService.dismiss();
      if (result.success) {
        this._activity = result.data;
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
