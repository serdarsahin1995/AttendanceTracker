import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesajGComponent } from './mesaj-g.component';

describe('MesajGComponent', () => {
  let component: MesajGComponent;
  let fixture: ComponentFixture<MesajGComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesajGComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesajGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
