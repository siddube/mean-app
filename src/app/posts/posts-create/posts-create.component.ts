import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PostsService } from '../posts.service';

@Component({
  selector: 'app-posts-create',
  templateUrl: './posts-create.component.html',
  styleUrls: ['./posts-create.component.css']
})

export class PostsCreateComponent {
  constructor(public postService: PostsService) {}

  onAddPost (form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.postService.setPost(form.value.title, form.value.message);
  }
}
