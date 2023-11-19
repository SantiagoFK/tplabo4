import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService 
{
  
  url: string = 'http://localhost:4000/v1/users'

  constructor(private http: HttpClient) { }

  async login(email: string, password: string)
  {
    try{
      const response = await fetch(`${this.url}/login`, {
        method: 'POST',
        body: JSON.stringify({email, password}),
        headers: { 'Content-type': 'application/json'}
      })

      if( response.ok )
      {
        const user = await response.json()
        //save user in localstorage
        localStorage.setItem('user', JSON.stringify(user))
      }

    }catch(error)
    {
      console.log(error)
    }
  }
  
  //checkea si el usuario esta logeado
  userIsLoggedIn(): boolean
  {
    if( localStorage.getItem('user') )
    {
      return true
    }

    return false
  }
  
  logout(): void
  {
    localStorage.clear()
  }

  async signup(email: string, username: string, password: string)
  {
    try{
      const response = await fetch(`${this.url}/signup`, {
        method: 'POST',
        body: JSON.stringify({email, username, password}),
        headers: { 'Content-type': 'application/json' }
      })

      if( response.ok )
      {
        const user = await response.json()
        localStorage.setItem('user', JSON.stringify(user))
      }
    }catch(error)
    {
      console.log(error)
    }
  }

  async getUserStats()
  {
    try{
      const response = await fetch(`${this.url}/stats`)
      const stats = await response.json()
      const { userCount } = stats 
      return { userCount }
    }catch(error)
    {
      console.log(error)
    }

    return {}
  }
  
}
