import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DemoDragNDropComponent } from './demo-drag-n-drop.component';

describe('DemoDragNDropComponent', () => {
  let component: DemoDragNDropComponent;
  let fixture: ComponentFixture<DemoDragNDropComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DemoDragNDropComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoDragNDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
