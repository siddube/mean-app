import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from './../posts.model';
import { PostsService } from './../posts.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})

export class PostsListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postSub: Subscription;

  constructor(public postService: PostsService) {
  }

  ngOnInit () {
    this.posts = this.postService.getPosts();
    this.postService.getPostUpdateListener().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  ngOnDestroy () {
    this.postSub.unsubscribe();
  }
}
