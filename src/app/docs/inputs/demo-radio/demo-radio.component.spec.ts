import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DemoRadioComponent } from './demo-radio.component';

describe('DemoRadioComponent', () => {
  let component: DemoRadioComponent;
  let fixture: ComponentFixture<DemoRadioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DemoRadioComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
