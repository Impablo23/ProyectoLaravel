import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutProductoComponent } from './layout-producto.component';

describe('LayoutProductoComponent', () => {
  let component: LayoutProductoComponent;
  let fixture: ComponentFixture<LayoutProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutProductoComponent]
    });
    fixture = TestBed.createComponent(LayoutProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
