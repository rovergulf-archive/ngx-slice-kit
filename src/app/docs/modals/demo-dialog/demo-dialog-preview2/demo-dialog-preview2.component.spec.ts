import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DemoDialogPreview2Component } from './demo-dialog-preview2.component';

describe('DemoDialogPreview2Component', () => {
  let component: DemoDialogPreview2Component;
  let fixture: ComponentFixture<DemoDialogPreview2Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DemoDialogPreview2Component]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoDialogPreview2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
