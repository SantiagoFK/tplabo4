import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms'
import { ArticleService } from 'src/app/services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/interfaces/Article';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent implements OnInit{
  articleId: string = ''

  articleForm: FormGroup = this.fb.group({
    title: [''],
    author: [''],
    body: ['']
})

  constructor(private fb: FormBuilder, 
              private articleService: ArticleService,
              private router: Router,
              private route: ActivatedRoute){}

  ngOnInit(): void {
    
    this.route.params.subscribe(async params => {
      this.articleId = params['id'];
    })

    this.initForm()
  }

  initForm()
  {

    this.articleService.getArticleById(this.articleId).subscribe(
      {
        next: (article) => {
          this.articleForm = this.fb.nonNullable.group({
            title: [article.title, Validators.required],
            author: [article.author, Validators.required],
            body: [article.body, Validators.required]
          })
        },
        error: (error) => {
          console.log(error)
        }
      }
    )
  }

  saveArticle()
  {
      if( this.articleForm.invalid )
      {
        console.log("Invalid form")
        return
      }
      
      const article: Article = {
        _id: this.articleId,
        title: this.articleForm.controls['title'].value,
        author: this.articleForm.controls['author'].value,
        body: this.articleForm.controls['body'].value,
        created: new Date()
      }

      this.articleService.updateArticle(article).subscribe(
        {
          next: (article) => {
            console.log(article)
            this.router.navigate([''])
          },
          error: (error) => {
            console.log(error)
          }
        }
      )  
  }

  cancelUpdate()
  {
    this.router.navigate(['read/', this.articleId])
  }

}
