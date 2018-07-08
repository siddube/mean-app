import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { PostsService } from '../posts.service';
import { Post } from './../posts.model';
@Component({
  selector: 'app-posts-create',
  templateUrl: './posts-create.component.html',
  styleUrls: ['./posts-create.component.css']
})

export class PostsCreateComponent implements OnInit {
  constructor(public postService: PostsService, public route: ActivatedRoute) {}
  private mode = 'create';
  private postId: string;
  form: FormGroup;
  imagePreview: string;
  isLoading = false;
  post: Post;
  ngOnInit () {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      message: new FormControl(null, {
        validators: [Validators.required]
      }),
      image: new FormControl(null, {
        validators: [Validators.required]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postService.getPost(this.postId).subscribe((data) => {
          this.isLoading = false;
          this.post = {id: data.post._id, title: data.post.title, message: data.post.message};
          this.form.setValue({
            title: this.post.title,
            message: this.post.message
          });
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onSavePost () {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postService.setPost(this.form.value.title, this.form.value.message);
    } else {
      this.postService.editPost(this.postId, this.form.value.title, this.form.value.message);
    }

    this.form.reset();
  }

  onImageUploaded (event: Event) {
    const image = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(image);
    console.log(image);
  }
}
