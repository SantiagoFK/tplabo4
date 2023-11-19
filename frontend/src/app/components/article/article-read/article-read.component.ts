import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/interfaces/Article';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';

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
              private router: Router,
              private authService: AuthService){}

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

  userIsLoggedIn(): boolean
  {
    return this.authService.userIsLoggedIn()
  }

  saveUpvote()
  {
    const article: Article = {
      title: this.article!.title,
      author: this.article!.author,
      body: this.article!.body,
      created: this.article!.created,
      upvotes: (this.article!.upvotes)! + 1
    }

    this.articleService.updateArticle(article).subscribe(
      {
        next: (article) => {
          console.log('Save:', article)
          this.router.navigate([''])
        },
        error: (error) => {
          console.log(error)
        }
      }
    )  
  }

}
