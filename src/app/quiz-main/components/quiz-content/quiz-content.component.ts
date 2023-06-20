import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { quizTopics } from '../../consts/topics';
import { Question } from '../../interfaces/question.interface';

@Component({
  selector: 'app-quiz-content',
  templateUrl: './quiz-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizContentComponent implements OnInit {
  quizTopicsItems: { value: string, name: string }[] = quizTopics;
  questionsIdsArray: number[] = [];
  currentQuizTopic$: Observable<string> = this.quizService.currentQuizTopic$
    .pipe(
      map((data: string) => this.quizTopicsItems.find((el: { value: string, name: string }) => el.value === data)?.name || '')
    );

  private ngDestroyed$ = new Subject<void>();

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.quizService.getQuestionsByTopic(this.quizService.currentQuizTopic)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((resp: Question[]) => {
        if (resp && resp.length) {
          this.questionsIdsArray = Object.values(resp[0]).map(item => item.id);
        }
      });
  }
}
