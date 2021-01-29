import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DemoInputsComponent } from './demo-inputs.component';

describe('DemoInputsComponent', () => {
  let component: DemoInputsComponent;
  let fixture: ComponentFixture<DemoInputsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DemoInputsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
