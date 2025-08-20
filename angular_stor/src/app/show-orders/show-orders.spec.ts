import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOrders } from './show-orders';

describe('ShowOrders', () => {
  let component: ShowOrders;
  let fixture: ComponentFixture<ShowOrders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowOrders]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowOrders);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
