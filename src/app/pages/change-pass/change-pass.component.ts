import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss'],
})
export class ChangePassComponent {
  currentPassword: any;
  newPassword: any;

  constructor(
    private accountServices: AccountService,
    private toaster: ToastrService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.accountServices
      .changePassword(this.currentPassword, this.newPassword)
      .subscribe(
        (res) => {
          this.router.navigateByUrl('/posts')
        },
        (error) => {
          // Handle error
          this.toaster.warning(error.error)
          console.error('Error occurred while changing password:', error);
        }
      );
  }
}
