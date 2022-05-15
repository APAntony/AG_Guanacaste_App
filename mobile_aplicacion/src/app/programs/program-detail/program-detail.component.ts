import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '@core/services';
import { UserService } from '@core/services/user/user.service';
import { CommentService } from '../services/comment.service';
import { ProgramsService } from '../services/programs.service';

@Component({
  selector: 'app-program-detail',
  templateUrl: './program-detail.component.html',
  styleUrls: ['./program-detail.component.scss'],
})
export class ProgramDetailComponent implements OnInit {

  private _program: any;
  public get Program(): any {
    return this._program;
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

  
  private _showComments:boolean;
  public get ShowComments() : boolean {
    return this._showComments;
  }

  private _page: string;

  private _id: string;

  constructor(
    private user: UserService,
    private activatedRoute: ActivatedRoute,
    private commentService: CommentService,
    private programsService: ProgramsService,
    private userService: UserService,
    private loaderService: LoaderService
  ) {
    this._id = this.activatedRoute.snapshot.paramMap.get('id');
    this._loading = true;
    this._program = {};
    this._page = '0';
  }

  ngOnInit() {
    this.loaderService.present('Cargando');

    this.programsService.find(this._id).toPromise().then(result => {
      this.loaderService.dismiss();
      if (result.success) {
        this._program = result.data;
      }
      this._loading = false;
    }).catch(err => {

    });

    this.userService.getSessionState().subscribe((data:boolean)=>{
      this._showComments = data;
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
