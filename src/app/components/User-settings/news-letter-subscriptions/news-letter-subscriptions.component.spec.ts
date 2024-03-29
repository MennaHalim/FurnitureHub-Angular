import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsLetterSubscriptionsComponent } from './news-letter-subscriptions.component';

describe('NewsLetterSubscriptionsComponent', () => {
  let component: NewsLetterSubscriptionsComponent;
  let fixture: ComponentFixture<NewsLetterSubscriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsLetterSubscriptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewsLetterSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
