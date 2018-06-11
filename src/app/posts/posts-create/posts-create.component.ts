import { Component } from '@angular/core';

@Component({
  selector: 'app-posts-create',
  templateUrl: './posts-create.component.html',
  styleUrls: ['./posts-create.component.css']
})
export class PostsCreateComponent {
  newPost = '';
  enteredText = '';
  onAddPost () {
    this.newPost = this.enteredText;
  }
}
