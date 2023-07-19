import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Image, UserProfile } from '../models/userProfile';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  constructor(private http: HttpClient) {}

  loadUserProfile() {
    return this.http.get<UserProfile>(
      `${environment.apiUrl}/v1/users/current-user`
    );
  }

  loadCurrentUserPost(){
    return this.http.get<UserProfile>(
      `${environment.apiUrl}/v1/users/current-user-posts`
    );
  }

  addImage(image: FormData) {
    return this.http.post<Image>(
      `${environment.apiUrl}/v1/users/add-image`,
      image
    );
  }

  updateMainImage(image: Image) {
    return this.http.put<Image>(
      `${environment.apiUrl}/v1/users/set-main-photo/${image.id}`,
      image
    );
  }

  getOwnerData(ownerId: string) {
    return this.http.get<UserProfile>(
      `${environment.apiUrl}/v1/users/${ownerId}`
    );
  }

  loadAllUsers(){
    return this.http.get<UserProfile[]>(
      `${environment.apiUrl}/v1/users`
    );
  }
}
