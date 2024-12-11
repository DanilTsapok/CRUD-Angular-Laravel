import { Component, OnInit } from '@angular/core';
import { Post, PostService } from './posts.service';
import { CommonModule } from '@angular/common';
import { CreateFormComponent } from "../create-form/create-form.component";
import { EditformComponent } from "../editform/editform.component";
import { Observable } from 'rxjs';


@Component({
  selector: 'app-posts',
  imports: [CommonModule, CreateFormComponent, EditformComponent],
  standalone: true,
  templateUrl: 'posts.component.html',
  styleUrls: ['./products.component.css'],
})
export class PostComponent implements OnInit {
  posts: Post[] = [];

  creating = false;

  edit =false;
  selectPost!:Post;
  constructor(private postService: PostService) {}

  ngOnInit() {
    this.loadPost();
  }

  loadPost() {
    this.postService
      .getPosts()
      .subscribe((data) => (this.posts = data));
  }

  reload() {
    this.loadPost();
  }

  close(){
    this.creating=!this.creating
    this.loadPost();
  }
  closeEdit(){
    this.edit = !this.edit
    this.loadPost();
  }
  create() {
    this.creating = true;
    this.loadPost();
  }

  editPost(id: string | undefined){
   if (id) {
    console.log(id)
    this.postService.getPost(id).subscribe(
      (data) => {
        this.selectPost = data; console.log(this.selectPost)
        this.edit = true; 
      },
      (error) => {
        console.error('Error fetching post:', error);
      }
    );
  }
  }

  delete(id: string | undefined) {
    if (id) {
      this.postService
        .deletePost(id)
        .subscribe(() => this.loadPost());
    }
  }

}
