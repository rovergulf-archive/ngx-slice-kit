import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DemoTextareaComponent } from './demo-textarea.component';

describe('DemoTextareaComponent', () => {
  let component: DemoTextareaComponent;
  let fixture: ComponentFixture<DemoTextareaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DemoTextareaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
