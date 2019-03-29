import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportscptComponent } from './importscpt.component';

describe('ImportscptComponent', () => {
  let component: ImportscptComponent;
  let fixture: ComponentFixture<ImportscptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportscptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportscptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
