import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingOptionsComponent } from './shopping-options.component';

describe('ShoppingOptionsComponent', () => {
  let component: ShoppingOptionsComponent;
  let fixture: ComponentFixture<ShoppingOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingOptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShoppingOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
