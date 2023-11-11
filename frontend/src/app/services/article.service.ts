import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, map, pipe, catchError } from 'rxjs'
import { Article } from '../interfaces/Article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  url: string = 'http://localhost:4000/v1/articles'

  constructor(private http: HttpClient) { }
  
  /*
  getArticles(): Observable<Article[]>
  {
    return this.http.get<Article[]>(this.url).pipe(
      map(data => {
        return data.map(article => {
          return {
            title: article.title,
            author: article.author
          }
        })
      }),
    
      catchError(error => {
        console.log("Error en la solicitud http: ", error)
        return []
      })
    )
  }*/
  
  /*
  async getArticles()
  {
    try{
      const response = await fetch(this.url)

      if( response.ok )
      {
        const json = await response.json()
        return json
      } 
    }catch(error)
    {
      console.log(error)
    }
  }*/
  
  getArticles()
  {
    return this.http.get<Article[]>(this.url).pipe(
      map(articles => {
        return articles.map(article => {
          return {
            title: article.title,
            author: article.author
          }
        })
      }),

      catchError(error => {
        console.log(error)
        return []
      })
    )
  }


}
