import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartViewerComponent } from './cart-viewer.component';

describe('CartViewerComponent', () => {
  let component: CartViewerComponent;
  let fixture: ComponentFixture<CartViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
