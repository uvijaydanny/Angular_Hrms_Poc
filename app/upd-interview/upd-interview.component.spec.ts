import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdInterviewComponent } from './upd-interview.component';

describe('UpdInterviewComponent', () => {
  let component: UpdInterviewComponent;
  let fixture: ComponentFixture<UpdInterviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdInterviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
