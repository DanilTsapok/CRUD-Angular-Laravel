import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Post, PostService } from '../posts/posts.service';

@Component({
  selector: 'app-editform',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './editform.component.html',
  styleUrls: ['./editform.component.css'], 
})
export class EditformComponent implements OnInit {
  @Input() selectPost!: Post;
  @Output() close = new EventEmitter();
  editForm!: FormGroup; 

  constructor(private fb: FormBuilder, private postService: PostService) {}

  ngOnInit() {
    if (this.selectPost) {
      this.initializeForm();
    }
  }

  ngOnChanges() {
    if (this.selectPost) {
      this.initializeForm();
    }
  }

  initializeForm() {
    this.editForm = this.fb.group({
      name: [this.selectPost.name, Validators.required],
      description: [this.selectPost.description, Validators.required],
    });
  }

  onSubmit() {
    if (this.editForm.valid) {
      const updatedPost: Post = {
        ...this.selectPost,
        ...this.editForm.value,
      };

      this.postService.updatePost(this.selectPost.id, updatedPost).subscribe({
        next: () => {
          this.editForm.reset();
          this.close.emit();
        },
        error: (err) => {
          console.error('Error updating post:', err);
        },
      });
    } else {
      console.error('Form is invalid!');
    }
  }
}