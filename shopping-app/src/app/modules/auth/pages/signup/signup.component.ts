import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  errorMessage = '';

  // validator for password matching
  private passwordsMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const group = control as FormGroup;
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  };

  form = new FormGroup(
    {
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/),
      ]),
      confirmPassword: new FormControl('', Validators.required),
    },
    { validators: this.passwordsMatchValidator }
  );

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  signup() {
    // Quick check for overall form validity
    if (this.form.invalid) {
      this.errorMessage = 'Please fill out the form correctly!';
      return;
    }

    const { username, password } = this.form.value;

    this.authService.signup(username!, password!).subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
        console.log('Signup successful!');
      },
      error: (error) => {
        if (error.status === 409) {
          this.errorMessage = 'Username already exists!';
        } else {
          this.errorMessage = 'Error signing up';
          console.error('Error signing up', error);
        }
      },
    });
  }

  get usernameControl() {
    return this.form.get('username');
  }

  get passwordControl() {
    return this.form.get('password');
  }

  get confirmPasswordControl() {
    return this.form.get('confirmPassword');
  }

  // Show only the first error that applies for each field
  getUsernameErrorMessage(): string {
    const errors = this.usernameControl?.errors;
    if (errors?.['required']) {
      return 'Username required';
    } else if (errors?.['minlength']) {
      return 'Min 4 chars';
    }
    return '';
  }
  
  getPasswordErrorMessage(): string {
    const errors = this.passwordControl?.errors;
    if (errors?.['required']) {
      return 'Password required';
    } else if (errors?.['minlength']) {
      return 'Min 4 chars';
    } else if (errors?.['pattern']) {
      return 'Needs upper, lower, digit';
    }
    return '';
  }
  
  getConfirmPasswordErrorMessage(): string {
    if (this.confirmPasswordControl?.hasError('required')) {
      return 'Password required';
    } else if (this.form.hasError('passwordsMismatch')) {
      return 'Password mismatch';
    }
    return '';
  }
}
  
