import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DersInfoComponent } from './ders-info.component';

describe('DersInfoComponent', () => {
  let component: DersInfoComponent;
  let fixture: ComponentFixture<DersInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DersInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DersInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
