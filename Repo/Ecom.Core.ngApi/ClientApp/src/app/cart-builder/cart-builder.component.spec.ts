import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartBuilderComponent } from './cart-builder.component';

describe('CartBuilderComponent', () => {
  let component: CartBuilderComponent;
  let fixture: ComponentFixture<CartBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
