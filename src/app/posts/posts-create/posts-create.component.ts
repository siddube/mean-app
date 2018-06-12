import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from './../posts.model';

@Component({
  selector: 'app-posts-create',
  templateUrl: './posts-create.component.html',
  styleUrls: ['./posts-create.component.css']
})

export class PostsCreateComponent {
  title = '';
  message = '';
  @Output() postCreated = new EventEmitter<Post>();

  onAddPost () {
     const newPost: Post = {
      title: this.title,
      message: this.message
    };
    this.postCreated.emit(newPost);
    // console.log(newPost);
  }
}
