import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayallproductsComponent } from './displayallproducts.component';

describe('DisplayallproductsComponent', () => {
  let component: DisplayallproductsComponent;
  let fixture: ComponentFixture<DisplayallproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayallproductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplayallproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
