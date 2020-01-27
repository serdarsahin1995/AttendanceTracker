import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtamaComponent } from './atama.component';

describe('AtamaComponent', () => {
  let component: AtamaComponent;
  let fixture: ComponentFixture<AtamaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtamaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtamaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
