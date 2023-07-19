import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { UserMessages } from '../models/message';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor(private http: HttpClient) {}

  loadMessages(userId: string) {
    return this.http.get<UserMessages[]>(
      `${environment.apiUrl}/v1/messages/thread/${userId}`
    );
  }

  loadAllMessages() {
    return this.http.get<UserMessages[]>(`${environment.apiUrl}/v1/messages`);
  }

  createMessages(message: UserMessages, recipientId: string) {
    return this.http.post<UserMessages>(
      `${environment.apiUrl}/v1/messages/${recipientId}`,
      message
    );
  }

  removeMessage(messageId:string){
    return this.http.delete(`${environment.apiUrl}/v1/messages/${messageId}`)
  }
}
