import { HttpClient } from '@angular/common/http';
import { Post } from './posts.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor (private http: HttpClient) {

  }
  getPosts () {
    this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
      .pipe(map((data) => {
        return data.posts.map((post) => {
          return {
            title: post.title,
            message: post.message,
            id: post._id
          };
        });
      }))
      .subscribe((mapPosts) => {
        this. posts = mapPosts;
        this.postsUpdated.next([...this.posts]);
    });
  }

  setPost (title: String, message: String) {
    const newPost: Post = {
      id: null,
      title,
      message
    };
    this.http.post<{message: string}>('http://localhost:3000/api/posts', newPost)
      .subscribe((data) => {
        console.log(data.message);
        this.posts.push(newPost);
        this.postsUpdated.next([...this.posts]);
      });
  }

  deletePost (postId) {
    this.http.delete<{postId: string}>(`http://localhost:3000/api/posts/${postId}`)
      .subscribe(() => {
        console.log('Delete Post!');
      });
  }

  getPostUpdateListener () {
    return this.postsUpdated.asObservable();
  }
}
