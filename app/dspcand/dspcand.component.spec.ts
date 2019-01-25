import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DspcandComponent } from './dspcand.component';

describe('DspcandComponent', () => {
  let component: DspcandComponent;
  let fixture: ComponentFixture<DspcandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DspcandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DspcandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
