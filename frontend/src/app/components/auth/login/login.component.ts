import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userForm: FormGroup = this.fb.nonNullable.group({
    email: ['', Validators.email],
    password: ['']
  })

  constructor(private fb: FormBuilder, 
              private authService: AuthService){}

  login()
  {
    if( this.userForm.valid )
    {
      console.log("login")
      console.log(this.userForm.controls['email'].value)
      
      const email = this.userForm.controls['email'].value
      const pass = this.userForm.controls['password'].value

      this.authService.login(email, pass)
    }
  }
}
