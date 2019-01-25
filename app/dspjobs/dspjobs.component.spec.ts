import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DspjobsComponent } from './dspjobs.component';

describe('DspjobsComponent', () => {
  let component: DspjobsComponent;
  let fixture: ComponentFixture<DspjobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DspjobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DspjobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
