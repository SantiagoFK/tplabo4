import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ArticleCreateComponent } from './components/article/article-create/article-create.component';
import { ArticleListComponent } from './components/article/article-list/article-list.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { CreatePageComponent } from './pages/create-page/create-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { WeekAdsComponent } from './components/article/week-ads/week-ads.component';
import { AdsListComponent } from './components/article/ads-list/ads-list.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ArticleReadComponent } from './components/article/article-read/article-read.component';
import { ReadArticlePageComponent } from './pages/read-article-page/read-article-page.component';
import { EditArticlePageComponent } from './pages/edit-article-page/edit-article-page.component';
import { ArticleEditComponent } from './components/article/article-edit/article-edit.component';
import { StatsPageComponent } from './pages/stats-page/stats-page.component';
import { StatsComponent } from './components/shared/stats/stats.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ArticleListComponent,
    HeaderComponent,
    FooterComponent,
    ArticleCreateComponent,
    CreatePageComponent,
    LoginPageComponent,
    SignupPageComponent,
    SignupComponent,
    LoginComponent,
    WeekAdsComponent,
    AdsListComponent,
    NavbarComponent,
    LandingPageComponent,
    ArticleReadComponent,
    ReadArticlePageComponent,
    EditArticlePageComponent,
    ArticleEditComponent,
    StatsPageComponent,
    StatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
