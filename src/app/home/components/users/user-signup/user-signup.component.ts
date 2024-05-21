import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { matchPasswords } from './validators/match-passwords.validator';
import { UserService } from '../services/user-service.service';
import { user } from '../../../types/user.type';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-user-signup',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.scss',
  providers: [UserService]
})
export class UserSignupComponent implements OnInit{
  userSignupForm: FormGroup;
  alertMessage: string = '';
  alertType: number = 0;

  constructor(private fb: FormBuilder, private userService: UserService){}

  ngOnInit(): void {
    this.userSignupForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: [''],
        address: [''],
        city: [''],
        state: [''],
        pin: [''],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      },
      {
        validator: matchPasswords,
      }
    );
  }

  get firstName(): AbstractControl<any, any> | null {
    return this.userSignupForm.get('firstName');
  }

  get email(): AbstractControl<any, any> | null {
    return this.userSignupForm.get('email');
  }

  get password(): AbstractControl<any, any> | null {
    return this.userSignupForm.get('password');
  }

  get confirmPassword(): AbstractControl<any, any> | null {
    return this.userSignupForm.get('confirmPassword');
  }

  onSubmit(): void{
    const user: user = {
      firstName: this.firstName?.value,
      lastName: this.userSignupForm.get('lastName')?.value,
      address: this.userSignupForm.get('address')?.value,
      city: this.userSignupForm.get('city')?.value,
      state: this.userSignupForm.get('state')?.value,
      pin: this.userSignupForm.get('pin')?.value,
      email: this.email?.get('email')?.value,
      password: this.password?.value,
    };

    this.userService.createUser(user).subscribe({
      next: (result)=>{
        if (result.message === 'success'){
          this.alertMessage = 'User Created Successfully';
          this.alertType = 0;
        }
        else if (result.message === 'Email already exists'){
          this.alertMessage = result.message;
          this.alertType = 1;
        }
      },
      error: (error)=>{
        this.alertMessage = error.message;
        this.alertType = 2;
      }
    })
  }
}
