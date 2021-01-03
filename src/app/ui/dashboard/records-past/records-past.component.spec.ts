import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsPastComponent } from './records-past.component';

describe('RecordsPastComponent', () => {
  let component: RecordsPastComponent;
  let fixture: ComponentFixture<RecordsPastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordsPastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordsPastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
