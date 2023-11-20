import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/Article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-ads-list',
  templateUrl: './ads-list.component.html',
  styleUrls: ['./ads-list.component.css']
})
export class AdsListComponent implements OnInit
{
  previousADS: Article[] = []
  
  constructor(private articleService: ArticleService){}

  ngOnInit(): void {
    this.getPreviousADS()
  }

  async getPreviousADS()
  {
    const { previousADS } = await this.articleService.getADS()
    this.previousADS = previousADS
  }

}
