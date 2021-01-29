import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DemoSocialCardComponent } from './demo-social-card.component';

describe('DemoSocialCardComponent', () => {
  let component: DemoSocialCardComponent;
  let fixture: ComponentFixture<DemoSocialCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DemoSocialCardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoSocialCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
