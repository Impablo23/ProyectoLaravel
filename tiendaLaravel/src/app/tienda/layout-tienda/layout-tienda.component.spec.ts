import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutTiendaComponent } from './layout-tienda.component';

describe('LayoutTiendaComponent', () => {
  let component: LayoutTiendaComponent;
  let fixture: ComponentFixture<LayoutTiendaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutTiendaComponent]
    });
    fixture = TestBed.createComponent(LayoutTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
