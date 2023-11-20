import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/Article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-week-ads',
  templateUrl: './week-ads.component.html',
  styleUrls: ['./week-ads.component.css']
})
export class WeekAdsComponent implements OnInit{
  currentADS: Article | null = null

  constructor(private articleService: ArticleService){}

  ngOnInit(): void {
    this.getCurrentADS()
  }

  async getCurrentADS()
  {
    const { currentADS } = await this.articleService.getADS()
    this.currentADS = currentADS
  }
}
