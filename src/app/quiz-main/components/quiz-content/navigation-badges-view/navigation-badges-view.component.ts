import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-navigation-badges-view',
  templateUrl: './navigation-badges-view.component.html',
  styleUrls: ['./navigation-badges-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationBadgesViewComponent implements OnInit {
  @Input() questionsIdsArray: number[] = [];

  private ngDestroyed$ = new Subject<void>();

  constructor(private quizService: QuizService, private cdr: ChangeDetectorRef) { }

  get currentQuestionId(): number {
    return this.quizService.currentQuestionID;
  }

  ngOnInit(): void {
    this.quizService.currentQuestionID$
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe(() => {
        this.cdr.detectChanges();
      });
  }

  navigateToQuestionId(id: number): void {
    this.quizService.setCurrentQuestionID = id;
    this.cdr.detectChanges();
  }
}
