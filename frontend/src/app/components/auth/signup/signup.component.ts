import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  userForm: FormGroup = this.fb.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router){}

  signup()
  {
    if( this.userForm.valid )
    {
      const email = this.userForm.controls['email'].value
      const username = this.userForm.controls['username'].value
      const pass = this.userForm.controls['password'].value
  
      this.authService.signup(email, username, pass)      
      this.router.navigate([''])
    }
    
    return 
  }

  validateField(field: string, errorType: string): boolean
  {
    return this.userForm.controls[field].getError(errorType)
      && this.userForm.controls[field].touched
  }
}
