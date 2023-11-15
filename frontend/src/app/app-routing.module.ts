import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CreatePageComponent } from './pages/create-page/create-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { AuthGuard } from './guards/auth-guard';
import { ReadArticlePageComponent } from './pages/read-article-page/read-article-page.component';
import { EditArticlePageComponent } from './pages/edit-article-page/edit-article-page.component';
import { StatsPageComponent } from './pages/stats-page/stats-page.component';


const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'article/read/:id', component: ReadArticlePageComponent},
  {path: 'article/edit/:id', component: EditArticlePageComponent},
  {path: 'article/create', component: CreatePageComponent, canActivate:[AuthGuard]},
  {path: 'login', component: LoginPageComponent},
  {path: 'signup', component: SignupPageComponent}, 
  {path: 'stats', component: StatsPageComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
