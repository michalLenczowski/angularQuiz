import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { quizTopics } from '../../consts/topics';
import { QuizService } from '../../services/quiz.service';
import { STORING_ANSWERS_ARRAY } from '../../consts/storing-answers';

@Component({
  selector: 'app-quiz-combobox',
  templateUrl: './quiz-combobox.component.html',
  styleUrls: ['./quiz-combobox.component.scss']
})
export class QuizComboboxComponent implements OnInit {
  quizTopicsItems: { value: string, name: string}[] = quizTopics;

  constructor(private quizService: QuizService) { }

  get quizTopic(): string {
    return this.quizService.currentQuizTopic;
  }

  ngOnInit(): void {
  }

  isTopicDisabled(item: { value: string, name: string }): boolean {
    const savedAnswersArray = sessionStorage.getItem(STORING_ANSWERS_ARRAY);
    if (savedAnswersArray) {
      return !!JSON.parse(savedAnswersArray).find((el: {topic: string}) => el.topic === item.value);
    }
    return false;
  }

  changeTopicSelection(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.quizService.setCurrentQuizTopic = input.value;
  }
}
