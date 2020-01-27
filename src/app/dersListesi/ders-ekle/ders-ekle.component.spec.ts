import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DersEkleComponent } from './ders-ekle.component';

describe('DersEkleComponent', () => {
  let component: DersEkleComponent;
  let fixture: ComponentFixture<DersEkleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DersEkleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DersEkleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
