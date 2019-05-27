import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningsPage } from './warnings.page';

describe('WarningsPage', () => {
  let component: WarningsPage;
  let fixture: ComponentFixture<WarningsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarningsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarningsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
