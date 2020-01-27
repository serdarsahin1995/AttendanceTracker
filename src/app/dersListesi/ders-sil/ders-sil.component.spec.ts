import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DersSilComponent } from './ders-sil.component';

describe('DersSilComponent', () => {
  let component: DersSilComponent;
  let fixture: ComponentFixture<DersSilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DersSilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DersSilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
