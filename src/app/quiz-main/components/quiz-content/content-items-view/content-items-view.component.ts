import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, combineLatest } from 'rxjs';
import { distinctUntilChanged, map, take, takeUntil, tap } from 'rxjs/operators';
import { Answer } from '../../..//interfaces/answer.interface';
import { Question } from '../../..//interfaces/question.interface';
import { QuizService } from '../../../services/quiz.service';
import { quizTopics } from '../../../consts/topics';
import { STORING_ANSWERS_ARRAY } from '../../../consts/storing-answers';

const MAX_ID = 5;
const MIN_ID = 1;

@Component({
  selector: 'app-content-items-view',
  templateUrl: './content-items-view.component.html'
})
export class ContentItemsViewComponent implements OnInit {
  quizTopics = quizTopics;
  question: Question = { id: 1, name: '' };
  answers: Answer[] = [];
  selectedAnswersByTopic: { id: number, questionId: number}[] = [];

  private ngDestroyed$ = new Subject<void>();

  constructor(private quizService: QuizService, private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    combineLatest([
      this.quizService.currentQuizTopic$,
      this.quizService.currentQuestionID$
    ])
    .pipe(
      map(
        ([
          currentQuizTopic,
          currentQuestionID
        ]) => ({
          currentQuizTopic,
          currentQuestionID,
        })
      ),
      distinctUntilChanged(
        (previous, current) => {
          if (previous.currentQuizTopic !== current.currentQuizTopic) {
            this.selectedAnswersByTopic = [];
          }
          return previous.currentQuizTopic === current.currentQuizTopic
           && previous.currentQuestionID === current.currentQuestionID;
        }
      ),
      takeUntil(this.ngDestroyed$)
    )
    .subscribe(({currentQuizTopic, currentQuestionID}) => {
      this.getQuestion(currentQuizTopic, currentQuestionID);
      this.getAnswers(currentQuizTopic, currentQuestionID);
    });
  }

  getQuestion(topic: string, id: number): void {
    this.quizService.getQuestionsByTopic(topic)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((resp: Question[]) => {
        if (resp && resp.length) {
          this.question = Object.values(resp[0]).find(item => item.id === id);
        }
      });
  }

  getAnswers(topic: string, id: number): void {
    this.quizService.getAnswersByTopic(topic)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((resp: Answer[]) => {
        if (resp && resp.length) {
          this.answers = Object.values(resp[0]).filter(item => item.questionId === id);
        }
      });
  }

  prevQuestionId(): void {
    const currentQuestId = this.quizService.currentQuestionID;
    this.quizService.setCurrentQuestionID = currentQuestId === MIN_ID ? MIN_ID : currentQuestId - 1;
  }

  nextQuestionId(): void {
    const currentQuestId = this.quizService.currentQuestionID;
    this.quizService.setCurrentQuestionID = currentQuestId === MAX_ID ? MAX_ID : currentQuestId + 1;
  }

  setAnswer(item: Answer): void {
    const foundedQuestion = this.selectedAnswersByTopic.find(el => el.questionId === item.questionId);
    if (foundedQuestion) {
      this.selectedAnswersByTopic.splice(this.selectedAnswersByTopic.indexOf(foundedQuestion), 1);
      this.selectedAnswersByTopic.push(item);
    } else {
      this.selectedAnswersByTopic.push(item);
    }
  }

  isAnswerChecked(item: Answer): boolean {
    return !!this.selectedAnswersByTopic.find(el => el.id === item.id);
  }

  navigateToSummary(): void {
    this.router.navigate(['summary']);
  }

  submitPage(): void {
    this.storeAnswersInSessionStorage();
  }

  private storeAnswersInSessionStorage(): void {
    const savedAnswersArray = sessionStorage.getItem(STORING_ANSWERS_ARRAY);
    if (savedAnswersArray) {
      const newSavedArray = JSON.parse(savedAnswersArray);
      newSavedArray.push({
        topic: this.quizService.currentQuizTopic,
        answers: this.selectedAnswersByTopic
      });
      const foundElement = newSavedArray.find((el: {topic: string}) => el.topic !== this.quizService.currentQuizTopic);
      this.quizService.setCurrentQuizTopic = foundElement?.value || '';
      sessionStorage.setItem(STORING_ANSWERS_ARRAY, JSON.stringify(newSavedArray));
    } else {
      const storingObjArray = [{
        topic: this.quizService.currentQuizTopic,
        answers: this.selectedAnswersByTopic
      }];
      sessionStorage.setItem(STORING_ANSWERS_ARRAY, JSON.stringify(storingObjArray));
      const foundElement = this.quizTopics.find(el => el.value !== this.quizService.currentQuizTopic);
      this.quizService.setCurrentQuizTopic = foundElement?.value || '';
    }
    this.cdr.markForCheck();
  }
}
