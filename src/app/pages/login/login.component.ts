import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit, OnDestroy {
  private readonly dispose$ = new Subject();
  loginForm: FormGroup | null = null;
  display = false;
  email: string = '';

  constructor(
    private accountService: AccountService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.initLoginForm();
  }

  private initLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          // Validators.pattern(
          //   "(?=^.{6,10}$)(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*s).*$"
          // ),
        ],
      ],
    });
  }

  onSubmit() {
    this.accountService.login(this.loginForm?.value).subscribe(
      () => {
        this.toastr.success('Sucess login');
        this.router.navigateByUrl('/posts');
      },
      (error) => {
        this.toastr.warning(error.error);
        console.error(error);
      }
    );
  }

  showDialog() {
    this.display = true;
  }

  submitForm() {
    const payload = { email: this.email };
    this.accountService.sendForgotPasswordEmail(payload).subscribe(
      () => {
        this.toastr.info('send Success');
        window.location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnDestroy(): void {
    this.dispose$.next(null);
    this.dispose$.complete();
  }
}
