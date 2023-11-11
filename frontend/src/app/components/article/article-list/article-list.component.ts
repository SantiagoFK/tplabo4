import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/Article';
import { ArticleService } from 'src/app/services/article.service';
//import { io } from 'socket.io-client';
//import { Server } from 'socket.io';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit{
  articles: Article[] = []

  constructor(private articleService: ArticleService){}

  ngOnInit()
  {
    this.getArticles()
  }


  getArticles()
  {
    this.articleService.getArticles().subscribe(
      {
        next: (articles) => {
          this.articles = articles
        },
        error: (error) => {
          console.log(error)
        }
      }
    )
  }
  
}
