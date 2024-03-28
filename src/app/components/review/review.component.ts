import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-review',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
  reviewForm = new FormGroup({
    name: new FormControl('', Validators.required),
    summary:new FormControl('', Validators.required),
    rating: new FormControl(0, Validators.required),
    reviewText: new FormControl('', Validators.required)
  });

  rating: number = 0; 

  setRating(value: number) {
    this.rating = value;
    this.reviewForm.get('rating')?.setValue(value); 
  }

  onSubmit() {
    if (this.reviewForm.valid) {
      const reviewData = this.reviewForm.value;
      // Submit review data to your backend (implementation details depend on backend )
      console.log('Submitted review:', reviewData);
      this.reviewForm.reset(); // Clear form after submission
      this.rating = 0; // Reset rating display
    }
  }
}
