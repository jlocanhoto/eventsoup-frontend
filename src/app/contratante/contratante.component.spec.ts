import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratanteComponent } from './contratante.component';

describe('ContratanteComponent', () => {
  let component: ContratanteComponent;
  let fixture: ComponentFixture<ContratanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
