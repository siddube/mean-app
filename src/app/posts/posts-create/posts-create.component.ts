import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { PostsService } from '../posts.service';
import { Post } from './../posts.model';
@Component({
  selector: 'app-posts-create',
  templateUrl: './posts-create.component.html',
  styleUrls: ['./posts-create.component.css']
})

export class PostsCreateComponent implements OnInit {
  constructor(public postService: PostsService, public route: ActivatedRoute) {}
  private mode = 'create';
  private postId: string;
  private post: Post;
  ngOnInit () {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.post = this.postService.getPost(this.postId);
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onAddPost (form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.postService.setPost(form.value.title, form.value.message);
    form.resetForm();
  }
}
