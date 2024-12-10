import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Post, PostService } from '../posts/posts.service';

@Component({
  selector: 'app-create-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent  {
 @Output() openWindowState = new EventEmitter() ;
  
  postForm: FormGroup;

  constructor(private fb: FormBuilder, private postService: PostService) {
    this.postForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }


 

  onSubmit() {
    if (this.postForm.valid) {
      const newPost: Post = this.postForm.value;
      console.log(newPost);
      this.postService.createPost(newPost).subscribe({
        next: () => {
          this.postForm.reset(); 
          this.openWindowState.emit()
        },
        error: (err) => {
          console.error('Error creating post:', err);
        },
      });
    } else {
      console.error('Form is invalid!');
    }
  }
}