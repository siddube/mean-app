import { HttpClient } from '@angular/common/http';
import { Post } from './posts.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor (private http: HttpClient, public router: Router) {

  }
  getPosts () {
    this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
      .pipe(map((data) => {
        return data.posts.map((post) => {
          return {
            title: post.title,
            message: post.message,
            id: post._id,
            imagePath: post.imagePath
          };
        });
      }))
      .subscribe((mapPosts) => {
        this. posts = mapPosts;
        this.postsUpdated.next([...this.posts]);
    });
  }

  getPost (postId: string) {
    return this.http.get<{ _id: string, title: string, message: string, imagePath: string }>(`http://localhost:3000/api/posts/${postId}`);
  }

  setPost (title: string, message: string, image: File) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('message', message);
    postData.append('image', image, title);
    this.http.post<{message: string, post: Post}>('http://localhost:3000/api/posts', postData)
      .subscribe((data) => {
        const newPost: Post = {
          id: data.post.id,
          title,
          message,
          imagePath: data.post.imagePath
        };
        this.posts.push(newPost);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
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

  editPost (postId: string, title: string, message: string, image: File | string ) {
    let postData;
    if(typeof(image) === 'object') {
      postData = new FormData();
      postData.append('id', postId);
      postData.append('title', title);
      postData.append('message', message);
      postData.append('image', image, title);
    } else {
      postData = {
        id: postId,
        title,
        message,
        imagePath: image
      };
    }
    this.http.patch<{postId: string}>(`http://localhost:3000/api/posts/${postId}`, postData).subscribe((data) => {
      const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === postId);
        const post: Post = {
          id: postId,
          title: title,
          message: message,
          imagePath: ''
        };
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      this.router.navigate(['/']);
    });
  }
  getPostUpdateListener () {
    return this.postsUpdated.asObservable();
  }
}
