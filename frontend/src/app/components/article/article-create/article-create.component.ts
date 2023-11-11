import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Article } from 'src/app/interfaces/Article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css']
})
export class ArticleCreateComponent {
  articleForm: FormGroup = this.fb.nonNullable.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    body: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, 
              private articleService: ArticleService,
              private router: Router){}

  saveArticle()
  {
      if( this.articleForm.invalid )
      {
        console.log("Invalid form")
        return
      }
      
      const article: Article = {
        title: this.articleForm.controls['title'].value,
        author: this.articleForm.controls['author'].value,
        body: this.articleForm.controls['body'].value,
        created: new Date().toLocaleString()
      }

      this.articleService.postArticle(article).subscribe(
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
