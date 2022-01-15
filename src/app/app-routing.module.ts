import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { DashbordComponent } from './pages/admin/dashbord/dashbord.component';
import { UpdateCategoryComponent } from './pages/admin/update-category/update-category.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { ViewQuizQuestionComponent } from './pages/admin/view-quiz-question/view-quiz-question.component';
import { ViewQuizesComponent } from './pages/admin/view-quizes/view-quizes.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { PrequizComponent } from './pages/user/prequizInstruction/prequiz.component';
import { StartQuizComponent } from './pages/user/start-quiz/start-quiz.component';
import { UserDashbordComponent } from './pages/user/user-dashbord/user-dashbord.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'signup', component: SignupComponent, pathMatch: 'full', },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  //{path: '',redirectTo:'/login',pathMatch:'full'},

  {
    path: 'admin', component: DashbordComponent, canActivate: [AdminGuard],
    children: [
      {
        path: '',
        component:WelcomeComponent
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'categories',
        component: ViewCategoriesComponent,
      },
      {
        path: 'add-category',
        component:AddCategoryComponent,
      },
      {
        path: 'category/:cid',
        component: UpdateCategoryComponent,
      },

      {
        path:'quizzes',
        component:ViewQuizesComponent,
      },
      {
        path:'add-quiz',
        component:AddQuizComponent,
      },
      {
        path:'quiz/:qid',
        component:UpdateQuizComponent,
      },
      { 
        path: 'view-questions/:qid/:title',
        component:ViewQuizQuestionComponent
      },
      {
        path: 'add-question/:qid/:title',
        component: AddQuestionComponent
      },
      {
        path:'question/:quesId',
        component:UpdateQuestionComponent
        
      }
    ],
  },
  { path: 'user-dashbord', component: UserDashbordComponent,  canActivate: [NormalGuard],
    children:[
      {
        path:':catId',
        component:LoadQuizComponent
      },
      {
        path:'instructions/:qid',
        component:PrequizComponent
      },
    ],
   },
   
    {
      path:'start/:qid',
      component:StartQuizComponent,
      canActivate: [NormalGuard],
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
