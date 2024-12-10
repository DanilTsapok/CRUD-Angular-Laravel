import { Component } from '@angular/core';
import { PostComponent } from './posts/posts.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PostComponent],
  templateUrl: 'app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
