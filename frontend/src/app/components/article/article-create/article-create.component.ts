import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Article } from 'src/app/interfaces/Article';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css']
})
export class ArticleCreateComponent {
  articleForm: FormGroup = this.fb.nonNullable.group({
    title: ['', Validators.required],
    author: [this.getUsername(), Validators.required],
    body: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, 
              private articleService: ArticleService,
              private router: Router,
              private authService: AuthService){}

  saveArticle()
  {
      if( this.articleForm.invalid )
      {
        return
      }
      
      const article: Article = {
        title: this.articleForm.controls['title'].value,
        author: this.articleForm.controls['author'].value,
        body: this.articleForm.controls['body'].value,
        created: new Date()
      }

      this.articleService.postArticle(article).subscribe(
        {
          next: (article) => {
            this.router.navigate([''])
          },
          error: (error) => {
            console.log(error)
          }
        }
      )
      
  }
  
  validateField(field: string, errorType: string): boolean
  {
    return this.articleForm.controls[field].getError(errorType)
      && this.articleForm.controls[field].touched
  }

  userIsLoggedIn(): boolean
  {
    return this.authService.userIsLoggedIn()
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
