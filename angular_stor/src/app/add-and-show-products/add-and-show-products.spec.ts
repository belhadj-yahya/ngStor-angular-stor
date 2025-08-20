import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAndShowProducts } from './add-and-show-products';

describe('AddAndShowProducts', () => {
  let component: AddAndShowProducts;
  let fixture: ComponentFixture<AddAndShowProducts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAndShowProducts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAndShowProducts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
