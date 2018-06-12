import { Post } from './posts.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  getPosts () {
    return [...this.posts];
  }

  setPost (title: String, message: String) {
    const newPost: Post = {
      title,
      message
    };
    this.posts.push(newPost);
    this.postsUpdated.next([...this.posts]);
  }

  getPostUpdateListener () {
    return this.postsUpdated.asObservable();
  }
}
