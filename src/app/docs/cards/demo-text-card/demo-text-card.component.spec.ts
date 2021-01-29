import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DemoTextCardComponent } from './demo-text-card.component';

describe('DemoTextCardComponent', () => {
  let component: DemoTextCardComponent;
  let fixture: ComponentFixture<DemoTextCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DemoTextCardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoTextCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
