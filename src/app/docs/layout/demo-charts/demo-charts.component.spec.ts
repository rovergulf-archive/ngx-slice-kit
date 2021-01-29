import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DemoChartsComponent } from './demo-charts.component';

describe('DemoChartsComponent', () => {
  let component: DemoChartsComponent;
  let fixture: ComponentFixture<DemoChartsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DemoChartsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
