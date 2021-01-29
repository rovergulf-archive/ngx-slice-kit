import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DemoVideoPlayerComponent } from './demo-video-player.component';

describe('DemoVideoPlayerComponent', () => {
  let component: DemoVideoPlayerComponent;
  let fixture: ComponentFixture<DemoVideoPlayerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DemoVideoPlayerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoVideoPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
