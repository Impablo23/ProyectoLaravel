import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTiendaComponent } from './list-tienda.component';

describe('ListTiendaComponent', () => {
  let component: ListTiendaComponent;
  let fixture: ComponentFixture<ListTiendaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListTiendaComponent]
    });
    fixture = TestBed.createComponent(ListTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
