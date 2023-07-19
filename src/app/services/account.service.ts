import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

import { environment } from 'src/environments/environment';

import { User } from '../models/user';
import { UserForLogin } from '../models/userForLogin';
import { UserForRegister } from '../models/userForRegister';
import { PresenceService } from './presence.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  currentUser$ = new BehaviorSubject<User | undefined>(undefined);

  constructor(
    private http: HttpClient,
    private persenceService: PresenceService
  ) {}

  login(userForLogin: UserForLogin) {
    return this.http
      .post<User>(`${environment.apiUrl}/v1/account/login`, userForLogin)
      .pipe(map((user) => this.setUserToLocalStorage(user)));
  }

  register(userFormRegister: UserForRegister) {
    return this.http
      .post<User>(`${environment.apiUrl}/v1/account/register`, userFormRegister)
      .pipe(map((user) => this.setUserToLocalStorage(user)));
  }

  changePassword(currentPassword: string, newPassword: string) {
    const payload = { currentPassword, newPassword };
    return this.http.post(
      `${environment.apiUrl}/v1/account/change-password`,
      payload
    );
  }

  sendForgotPasswordEmail(payload: any) {
    return this.http.post(
      `${environment.apiUrl}/v1/account/forgot-password`,
      payload
    );
  }

  resetPassword(userId: string, token: any, resetPasswordData: any) {
    const params = {
      userId: userId,
      token: token,
    };

    return this.http.post(
      `${environment.apiUrl}/v1/account/reset-password`,
      resetPasswordData,
      { params: params }
    );
  }

  setUserToLocalStorage(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser$.next(user);
    this.persenceService.createHubConnection(user);
  }

  getLoggedInUserId(): string {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.fullName;
  }
}
