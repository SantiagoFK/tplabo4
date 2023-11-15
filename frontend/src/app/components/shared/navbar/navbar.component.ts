import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{

  constructor(private authService: AuthService){}

  userIsLoggedIn(): boolean
  {
    return this.authService.userIsLoggedIn()
  }

  getEmail(): string
  {
    if( this.userIsLoggedIn() )
    {
      let token = localStorage.getItem('user')
      if(token)
      {
        let obj = JSON.parse(token!)
        let { email } = obj
        return email
      }
      else{
        return 'User'
      }     
    }

    return ''
  }
}
