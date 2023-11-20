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
  
  getArticles(): Observable<Article[]>
  {
    return this.http.get<Article[]>(this.url).pipe(
      map(articles => {
        return articles.map(article => {
          return {
            _id: article._id,
            title: article.title,
            author: article.author,
            body: article.body,
            created: article.created,
            upvotes: article.upvotes,
            adsvotes: article.adsvotes,
            isADS: article.isADS,
            wasADS: article.wasADS
          }
        })
      }),

      catchError(error => {
        console.log(error)
        return []
      })
    )
  }

  async getArticleStats()
  {
    try{
      const response = await fetch(`${this.url}/stats`)
      const stats = await response.json()
      const { articleCount, upvotesCount, adsvotesCount, adsCount } = stats 
      return { articleCount, upvotesCount, adsvotesCount, adsCount }
    }catch(error)
    {
      console.log(error)
    }

    return {}
  }

  async getADS()
  {
    try{
      const response = await fetch(`${this.url}/ads`)
      const ads = await response.json()
      const { currentADS, previousADS } = ads
      return {  currentADS, previousADS } 
    }catch(error)
    {
      console.log(error)
    }

    return {}
  }

  getArticleById(_id: string): Observable<Article>
  {
    return this.http.get<Article>(`${this.url}/${_id}`).pipe(
      map(article => {
        return {
          _id: article._id,
          title: article.title,
          author: article.author,
          body: article.body,
          created: article.created,
          upvotes: article.upvotes,
          adsvotes: article.adsvotes,
          isADS: article.isADS,
          wasADS: article.wasADS
        }
      }),

      catchError(error => {
        console.log(error)
        return []
      })
    )
  }

  postArticle(article: Article): Observable<Article>
  {
      return this.http.post<Article>(
        this.url,
        article,
        {
          headers: { 'Content-type': 'application/json'}
        }
      )
  }

  updateArticle(article: Article): Observable<Article>
  {
    return this.http.patch<Article>(
      `${this.url}/${article._id}`,
      article,
      {
        headers: { 'Content-type': 'application/json' }
      }
    )
  }
  
  deleteArticle(_id: String | undefined)
  {
    return this.http.delete(`${this.url}/${_id}`)
  }

}
