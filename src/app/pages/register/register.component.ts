import { Component, OnDestroy, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MessageService } from 'primeng/api';

import { UserForRegister } from 'src/app/models/userForRegister';
import { AccountService } from 'src/app/services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService],
})
export class RegisterComponent implements OnInit, OnDestroy {
  private readonly dispose$ = new Subject();
  maxGraduationYear: Date = new Date();
  maxDateOfBirth: Date = new Date();

  registerForm: FormGroup | null = null;
  emailExists: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private accoutServices: AccountService,
    private messageService: MessageService,
    private toaster:ToastrService
  ) {}

  ngOnInit(): void {
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let nextMonth = month === 11 ? 0 : month;
    let nextYear = nextMonth === 0 ? year + 1 : year;

    this.maxGraduationYear = new Date(2023, 3, 19);
    this.maxGraduationYear.setMonth(nextMonth);
    this.maxGraduationYear.setFullYear(nextYear);

    this.maxDateOfBirth = new Date(2023, 3, 19);
    this.maxDateOfBirth.setMonth(nextMonth);
    this.maxDateOfBirth.setFullYear(nextYear);

    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern(
            "(?=^.{6,10}$)(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*s).*$"
          ),
        ],
      ],
      confarmPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
          ),
        ],
      ],
      gender: ['Male', Validators.required],
      dateOfBirth: ['', Validators.required],
      graduationYear: ['', Validators.required],
    });
  }


  onSubmit() {
    const formValue = this.registerForm?.value;
    const user: UserForRegister = {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      gender: formValue.gender,
      dateOfBirth: formValue.dateOfBirth,
      graduationYear: formValue.graduationYear,
      email: formValue.email,
      password: formValue.password,
    };
    this.accoutServices
      .register(user)
      .pipe(takeUntil(this.dispose$))
      .subscribe(
        () => {
          this.toaster.info('Register Success')
          this.router.navigateByUrl('/posts');
        },
        (error) => {
          if (error.error && error.error.errors && error.error.errors.DateOfBirth) {
            const errorMessage = error.error.errors.DateOfBirth[0];
            this.toaster.warning(errorMessage);
          } else if (error.error && error.error.errors && error.error.errors.GraduationYear) {
            const errorMessage = error.error.errors.GraduationYear[0];
            this.toaster.warning(errorMessage);
          }
          else{
            this.toaster.warning(error.error);

          }
          console.error(error);
        }

      );
  }

  ngOnDestroy(): void {
    this.dispose$.next(null);
    this.dispose$.complete();
  }
}
