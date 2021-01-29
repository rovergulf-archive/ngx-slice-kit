import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DemoShoppingCardComponent } from './demo-shopping-card.component';

describe('DemoShoppingCardComponent', () => {
  let component: DemoShoppingCardComponent;
  let fixture: ComponentFixture<DemoShoppingCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DemoShoppingCardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoShoppingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
