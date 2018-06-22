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

  getPost (postId: string) {
    return this.http.get<{message: string, post: any}>(`http://localhost:3000/api/posts/${postId}`);
  }

  setPost (title: String, message: String) {
    const newPost: Post = {
      id: null,
      title,
      message
    };
    this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts', newPost)
      .subscribe((data) => {
        const id = data.postId;
        newPost.id = id;
        this.posts.push(newPost);
        this.postsUpdated.next([...this.posts]);
      });
  }

  deletePost (postId: string) {
    this.http.delete<{postId: string}>(`http://localhost:3000/api/posts/${postId}`)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  editPost (postId: string, title: String, message: String) {
    const updatedPost: Post = {
      id: postId,
      title,
      message
    };
    this.http.patch<{postId: string}>(`http://localhost:3000/api/posts/${postId}`, updatedPost).subscribe(() => {

    });
  }
  getPostUpdateListener () {
    return this.postsUpdated.asObservable();
  }
}
