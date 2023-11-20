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
  articleId: string = ''
  editMode: boolean = false

  constructor(private articleService: ArticleService, 
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService){}

  ngOnInit(): void 
  {
    this.route.params.subscribe(async params => {
      this.articleId = params['id'];
    })

    this.getArticle()
  }

  getArticle()
  {
    this.articleService.getArticleById(this.articleId).subscribe(
      {
        next: (article) => {
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
      _id: this.articleId,
      title: this.article!.title,
      author: this.article!.author,
      body: this.article!.body,
      created: this.article!.created,
      upvotes: ++(this.article!.upvotes)!, //upvotes are incremented
      adsvotes: (this.article!.adsvotes)!,
      isADS: this.article!.isADS
    }
     
    this.articleService.updateArticle(article).subscribe({
        error: (error) => {
          console.log(error)
        }
    })
  }

  saveADSVote()
  {
    console.log("ads voted")

    const article: Article = {
      _id: this.articleId,
      title: this.article!.title,
      author: this.article!.author,
      body: this.article!.body,
      created: this.article!.created,
      upvotes: this.article!.upvotes,
      adsvotes: ++(this.article!.adsvotes)!, //ads votes are modified
      isADS: this.article!.isADS,
      wasADS: this.article!.wasADS
    }
     
    this.articleService.updateArticle(article).subscribe({
        error: (error) => {
          console.log(error)
        }
    })
  }

  userIsAuthor(): boolean
  {
    const currentUser = this.getUsername()
    const author = this.article?.author

    return (currentUser === author)
  }

  getUsername(): string
  {
    if( this.userIsLoggedIn() )
    {
      let token = localStorage.getItem('user')
      if(token)
      {
        let obj = JSON.parse(token!)
        let { username } = obj
        return username
      }
      else{
        return 'User'
      }     
    }

    return ''
  }

}
