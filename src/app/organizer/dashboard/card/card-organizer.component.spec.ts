import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOrganizerComponent } from './card-organizer.component';

describe('CardComponent', () => {
  let component: CardOrganizerComponent;
  let fixture: ComponentFixture<CardOrganizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardOrganizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardOrganizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
