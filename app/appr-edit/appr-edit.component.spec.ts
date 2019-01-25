import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprEditComponent } from './appr-edit.component';

describe('ApprEditComponent', () => {
  let component: ApprEditComponent;
  let fixture: ComponentFixture<ApprEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
