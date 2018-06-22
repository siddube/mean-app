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
  post: Post;
  ngOnInit () {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.postService.getPost(this.postId).subscribe((data) => {
          this.post = {id: data.post._id, title: data.post.title, message: data.post.message};
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onSavePost (form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.postService.setPost(form.value.title, form.value.message);
    } else {
      this.postService.editPost(this.postId, form.value.title, form.value.message);
    }

    form.resetForm();
  }
}
