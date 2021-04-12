import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiDefTableComponent } from './api-def-table.component';

describe('ApiDefTableComponent', () => {
  let component: ApiDefTableComponent;
  let fixture: ComponentFixture<ApiDefTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiDefTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiDefTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
