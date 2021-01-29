import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DemoPopoverComponent } from './demo-popover.component';

describe('DemoPopoverComponent', () => {
  let component: DemoPopoverComponent;
  let fixture: ComponentFixture<DemoPopoverComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DemoPopoverComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
