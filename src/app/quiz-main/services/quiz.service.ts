import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { quizTopics } from '../consts/topics';
import * as questions from '../../../assets/questions.json';
import * as answers from '../../../assets/answers.json';
import { Answer } from '../interfaces/answer.interface';
import { Question } from '../interfaces/question.interface';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private _currentQuestionID$ = new BehaviorSubject<number>(1);
  private _currentQuizTopic$ = new BehaviorSubject<string>(quizTopics[0].value);

  readonly currentQuestionID$ = this._currentQuestionID$.asObservable();
  readonly currentQuizTopic$ = this._currentQuizTopic$.asObservable();

  constructor() {}

  get currentQuestionID(): number {
    return this._currentQuestionID$.getValue();
  }

  set setCurrentQuestionID(value: number) {
    this._currentQuestionID$.next(value);
  }

  get currentQuizTopic(): string {
    return this._currentQuizTopic$.getValue();
  }

  set setCurrentQuizTopic(value: string) {
    this._currentQuizTopic$.next(value);
  }

  getQuestionsAmount(): number {
    let sum = 0;
    const questionsObj = Object.values(questions)[0];
    if (questionsObj) {
      for (const key in questionsObj) {
        sum += Object.values(questionsObj[key]).length;
      }
    }
    return sum;
  }

  getQuestionsByTopic(topic: string): Observable<Question[]> {
    const questionsObj = Object.values(questions)[0];
    for (const key in questionsObj) {
      if (key === topic) {
        return of([questionsObj[key]]);
      }
    }
    return of([]);
  }

  getAnswersByTopic(topic: string): Observable<Answer[]> {
    const answersObj = Object.values(answers)[0];
    for (const key in answersObj) {
      if (key === topic) {
        const answersByTopic = answersObj[key];
        return of([answersByTopic]);
      }
    }
    return of([]);
  }
}
