import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule  } from '@angular/material/select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizMainComponent } from './quiz-main/quiz-main.component';
import { SummaryComponent } from './quiz-main/components/summary/summary.component';
import { QuizComboboxComponent } from './quiz-main/components/quiz-combobox/quiz-combobox.component';
import { QuizContentComponent } from './quiz-main/components/quiz-content/quiz-content.component';
import { QuizService } from './quiz-main/services/quiz.service';
import { NavigationBadgesViewComponent } from './quiz-main/components/quiz-content/navigation-badges-view/navigation-badges-view.component';
import { ContentItemsViewComponent } from './quiz-main/components/quiz-content/content-items-view/content-items-view.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizMainComponent,
    SummaryComponent,
    QuizComboboxComponent,
    MatSelectModule,
    QuizContentComponent,
    NavigationBadgesViewComponent,
    ContentItemsViewComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule
  ],
  providers: [QuizService],
  bootstrap: [AppComponent]
})
export class AppModule { }
