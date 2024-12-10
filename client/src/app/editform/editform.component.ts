import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Post, PostService } from '../posts/posts.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-editform',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './editform.component.html',
  styleUrl: './editform.component.css'
})
export class EditformComponent {
  @Input() selectPost!:Post
  @Output() close = new EventEmitter() ;
  editForm: FormGroup;


  constructor(private fb: FormBuilder, private postService :PostService) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
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
          this.editForm.reset()
          this.close.emit()
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
