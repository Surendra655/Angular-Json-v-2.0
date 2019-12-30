import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListComponent } from './list/list.component';
import { FeedbackComponent } from './feedback/feedback.component';

const routes: Routes = [
      {
        path: '',
        component: LoginComponent,
      },

      {
        path: 'login',
        component: LoginComponent,
      },

      // {
      //   path: '',
      //   component: ListComponent,
      // },

      {
        path: 'list',
        component: ListComponent,
      },

      {
        path: 'feedback',
        component: FeedbackComponent,
      },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
