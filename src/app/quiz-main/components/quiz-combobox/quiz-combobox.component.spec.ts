import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizComboboxComponent } from './quiz-combobox.component';

describe('QuizComboboxComponent', () => {
  let component: QuizComboboxComponent;
  let fixture: ComponentFixture<QuizComboboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizComboboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizComboboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
