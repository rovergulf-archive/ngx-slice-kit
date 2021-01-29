import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DemoFilesComponent } from './demo-files.component';

describe('DemoFilesComponent', () => {
  let component: DemoFilesComponent;
  let fixture: ComponentFixture<DemoFilesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DemoFilesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
