import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProdutsComponent } from './all-produts.component';

describe('AllProdutsComponent', () => {
  let component: AllProdutsComponent;
  let fixture: ComponentFixture<AllProdutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllProdutsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllProdutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
