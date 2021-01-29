import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DemoCarouselComponent } from './demo-carousel.component';

describe('DemoCarouselComponent', () => {
  let component: DemoCarouselComponent;
  let fixture: ComponentFixture<DemoCarouselComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DemoCarouselComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
