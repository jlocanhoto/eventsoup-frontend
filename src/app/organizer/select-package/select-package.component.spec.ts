import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPackageComponent } from './select-package.component';

describe('SelectPackageComponent', () => {
  let component: SelectPackageComponent;
  let fixture: ComponentFixture<SelectPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
