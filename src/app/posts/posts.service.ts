import { HttpClient } from '@angular/common/http';
import { Post } from './posts.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor (private http: HttpClient) {

  }
  getPosts () {
    this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
      .subscribe((data) => {
        this. posts = data.posts;
        this.postsUpdated.next([...this.posts]);
    });
  }

  setPost (title: String, message: String) {
    const newPost: Post = {
      id: null,
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
