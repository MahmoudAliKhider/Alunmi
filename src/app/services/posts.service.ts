import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

import { Post } from '../models/post';
import { Comment } from '../models/comment';
import { PostParams } from '../models/postParams';
import { getPaginatedResult, getPaginationHeaders } from './pagination-helper';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  loadPosts(postParams: PostParams) {
    let params = getPaginationHeaders(
      postParams?.pageNumber,
      postParams?.pageSize,
      postParams?.keyword
    );

    return getPaginatedResult<Post[]>(
      `${environment.apiUrl}/v1/posts`,
      params,
      this.http
    );
  }

  removePost(postId: string) {
    return this.http.delete<Post>(`${environment.apiUrl}/v1/posts/${postId}`);
  }

  createPost(postFormData: FormData) {
    return this.http.post<Post>(`${environment.apiUrl}/v1/posts`, postFormData);
  }

  postForUpdate(postFormData: FormData) {
    return this.http.put<Post>(
      `${environment.apiUrl}/v1/posts/${postFormData.get('id')}`,
      postFormData
    );
  }

  loadPost(postId: string) {
    return this.http.get<Post>(`${environment.apiUrl}/v1/posts/${postId}`);
  }

  createLike(postId: string) {
    return this.http.post(`${environment.apiUrl}/v1/posts/${postId}/like`, {});
  }

  createComment(postId: string, content: string) {
    return this.http.post<Comment>(
      `${environment.apiUrl}/v1/posts/comments/${postId}`,
      { content }
    );
  }

  loadComment(postId: string) {
    return this.http.get<Comment[]>(
      `${environment.apiUrl}/v1/posts/comments/${postId}`
    );
  }
}
