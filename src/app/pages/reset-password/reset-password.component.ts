import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  userId: any;
  token: any;
  password: any;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.userId = params['userId'];
      this.token = params['token'];
    });
  }

  resetPassword() {
    if (!this.userId) {
      this.toastr.error('Invalid user');
      return;
    }

    const resetPasswordData = {
      password: this.password,
    };

    console.log(resetPasswordData);
    console.log(this.token);

    this.accountService
      .resetPassword(this.userId, this.token, resetPasswordData)
      .subscribe(
        () => {
          this.toastr.success('Password reset successful');
        },
        (error) => {
          this.toastr.error('Password reset failed');
          console.error(error);
        }
      );
  }
}
