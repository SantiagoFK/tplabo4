import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{
  mobileMode: boolean = false
  constructor(private authService: AuthService){}

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

  logout()
  {
    return this.authService.logout()
  }

  openSideBar(){
    this.mobileMode = true 
  }

  closeSideBar()
  {
    this.mobileMode = false
  }
}
