import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Post } from './../posts.model';

@Component({
  selector: 'app-posts-create',
  templateUrl: './posts-create.component.html',
  styleUrls: ['./posts-create.component.css']
})

export class PostsCreateComponent {
  @Output() postCreated = new EventEmitter<Post>();

  onAddPost (form: NgForm) {
    if (form.invalid) {
      return;
    }
     const newPost: Post = {
      title: form.value.title,
      message: form.value.message
    };
    this.postCreated.emit(newPost);
  }
}
