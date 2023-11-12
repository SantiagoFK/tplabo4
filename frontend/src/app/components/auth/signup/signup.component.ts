import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  userForm: FormGroup = this.fb.nonNullable.group({
    email: ['', Validators.email],
    password: ['']
  })

  constructor(private fb: FormBuilder){}

  signup()
  {
    console.log("signup")
  }
}
