import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DemoCalendarComponent } from './demo-calendar.component';

describe('DemoCalendarComponent', () => {
  let component: DemoCalendarComponent;
  let fixture: ComponentFixture<DemoCalendarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DemoCalendarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
