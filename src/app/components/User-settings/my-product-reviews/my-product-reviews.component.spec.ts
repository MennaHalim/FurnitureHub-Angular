import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProductReviewsComponent } from './my-product-reviews.component';

describe('MyProductReviewsComponent', () => {
  let component: MyProductReviewsComponent;
  let fixture: ComponentFixture<MyProductReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyProductReviewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyProductReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
