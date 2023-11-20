import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit{
  articleCount : number = 0
  userCount: number = 0
  upvotesCount: number = 0
  adsvotesCount: number = 0
  adsCount: number = 0

  constructor(private articleService: ArticleService,
              private authService: AuthService){}

  ngOnInit(): void {
    this.getArticleStats()
    this.getUserStats()
  }

  async getArticleStats()
  {
    const { 
      articleCount, 
      upvotesCount, 
      adsvotesCount,
      adsCount
    } = await this.articleService.getArticleStats()
    this.articleCount = articleCount
    this.upvotesCount = upvotesCount
    this.adsvotesCount = adsvotesCount
    this.adsCount = adsCount
  }

  async getUserStats()
  {
    const { userCount } = await this.authService.getUserStats()
    this.userCount = userCount
  }
  
}
