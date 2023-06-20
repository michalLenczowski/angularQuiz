import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizMainComponent } from './quiz-main/quiz-main.component';
import { SummaryComponent } from './quiz-main/components/summary/summary.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'main',
    component: QuizMainComponent,
  },
  {
    path: 'summary',
    component: SummaryComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
