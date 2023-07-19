import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserProfile } from '../models/userProfile';

@Injectable({
  providedIn: 'root',
})
export class FollowersService {
  constructor(private http: HttpClient) {}

  createFollow(destinationUserId: string) {
    return this.http.post(
      `${environment.apiUrl}/v1/followers/${destinationUserId}`,
      destinationUserId
    );
  }

  currentUserFollowers() {
    return this.http.get<UserProfile[]>(
      `${environment.apiUrl}/v1/followers/current-user-followers`
    );
  }
  currentUserFollowedBy() {
    return this.http.get<UserProfile[]>(
      `${environment.apiUrl}/v1/followers/current-user-followed-by`
    );
  }
}
