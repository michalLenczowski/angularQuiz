import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { Answer } from '../../interfaces/answer.interface';
import { STORING_ANSWERS_ARRAY } from '../../consts/storing-answers';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryComponent implements OnInit {
  correctDesignPatternsAnswers = 0;
  correctAngularAnswers = 0;
  correctJavaAnswers = 0;

  allQuestions: number = this.quizService.getQuestionsAmount();

  constructor(private quizService: QuizService, private router: Router) { }

  ngOnInit(): void {
    this.countSummaryResults();
  }

  navigateToMainPage(): void {
    this.router.navigate(['main']);
  }

  countSummaryResults(): void {
    const savedAnswersArray = sessionStorage.getItem(STORING_ANSWERS_ARRAY);
    if (savedAnswersArray) {
      const savedArray = JSON.parse(savedAnswersArray);

      this.correctDesignPatternsAnswers = this.getCorrectedAnswersAmountByTopic('designPatterns', savedArray);
      this.correctAngularAnswers = this.getCorrectedAnswersAmountByTopic('angular', savedArray);
      this.correctJavaAnswers = this.getCorrectedAnswersAmountByTopic('java', savedArray);
    }
  }

  getCorrectedAnswersAmountByTopic(topic: string, savedArray: { topic: string, answers: {isCorrect: boolean}[] }[]): number {
    const correctedAnswers = savedArray.find((el: { topic: string, answers: {isCorrect: boolean }[]}) =>
      el.topic === topic);

    return correctedAnswers?.answers.filter((e: { isCorrect: boolean}) => e.isCorrect).length || 0;
  }
}
