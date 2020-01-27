import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllcourseComponent } from './list-allcourse.component';

describe('ListAllcourseComponent', () => {
  let component: ListAllcourseComponent;
  let fixture: ComponentFixture<ListAllcourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAllcourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAllcourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
