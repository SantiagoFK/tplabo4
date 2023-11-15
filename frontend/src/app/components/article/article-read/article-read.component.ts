import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/interfaces/Article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article-read',
  templateUrl: './article-read.component.html',
  styleUrls: ['./article-read.component.css']
})
export class ArticleReadComponent implements OnInit{
  article: Article | undefined = undefined
  editMode: boolean = false

  constructor(private articleService: ArticleService, 
              private route: ActivatedRoute,
              private router: Router){}

  ngOnInit(): void {
    this.getArticle()
  }

  getArticle()
  {
    let articleId: string = ''

    this.route.params.subscribe(async params => {
      articleId = params['id'];
    })

    console.log(articleId)

    this.articleService.getArticleById(articleId).subscribe(
      {
        next: (article) => {
          console.log(article)
          this.article = article
        },
        error: (error) => {
          console.log(error)
        }
      }
    )
  }

  deleteArticle(id: String | undefined)
  {
      console.log()
      const ok = window.confirm(`Delete article with id: ${id}. Are you sure?`)
      if( ok )
      {
          this.articleService.deleteArticle(id).subscribe({
            next: () => {
              alert(`Article deleted successfully.`)
              this.router.navigate([''])
            },
            error: (error) => {
              alert(`Error while trying to delete article: ${error}`)
            }
          })
      }
  }

}