import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { UserMessages } from 'src/app/models/message';
import { UserProfile } from 'src/app/models/userProfile';
import { LoadingService } from 'src/app/services/loading.service';
import { MembersService } from 'src/app/services/members.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  private readonly dispose$ = new Subject();

  messages: UserMessages[] = [];
  message: UserMessages[] = [];
  users: UserProfile[] | null = [];
  fullName: string | undefined;
  messageForm: FormGroup | undefined;
  userId: any;
  messageId: any;
  isLoading = false;

  deleteOptions = [
    {
      label: 'Delete',
      value: 'delete',
      icon: 'pi pi-trash',
      command: () => this.removeMessage(this.messageId),
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private messageService: MessagesService,
    private loadingService: LoadingService,
    private membersService: MembersService,
    private toaster: ToastrService
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.isLoading = this.loadingService.isLoading;

    this.messageForm = this.formBuilder.group({
      content: ['', Validators.required],
    });

    if (this.userId) {
      this.loadMessages();
    } else {
      this.loadAllMessages();
    }
    this.loadUsers();
  }

  
  private loadMessages() {
    this.isLoading = true;
    this.messageService.loadMessages(this.userId).subscribe((message) => {
      this.messages = message;
      this.isLoading = false;
    });
  }

  private loadAllMessages() {
    this.isLoading = true;
    this.messageService.loadAllMessages().subscribe((message) => {
      this.messages = message;
      this.isLoading = false;
    });
  }

  sendMessage() {
    this.isLoading = true;

    if (this.messageForm?.valid) {
      const message: UserMessages = {
        id: null,
        senderName: '',
        senderImageUrl: null,
        recipientName: '',
        recipientImageUrl: null,
        content: this.messageForm!.get('content')!.value,
        dateRead: null,
        senderDeleted: false,
        recipientDeleted: false,
        senderId: null,
        recipientId: null, // Set the recipientId to the current userId
      };
      this.messageService.createMessages(message, this.userId).subscribe(
        (res) => {
          this.isLoading = false;
          this.messages.push(res);
          this.messageForm?.reset();
          // Since recipientId is set correctly, you don't need to loadMessages() again.
        },
        (err) => {
          console.error('Error sending message:', err);
        }
      );
    }
  }

  private loadUsers() {
    this.membersService
      .loadAllUsers()
      .pipe(takeUntil(this.dispose$))
      .subscribe((user) => {
        this.users = user;
      });
  }
  loadMessagesForFollower(users: UserProfile) {
    this.userId = users.id;
    this.fullName = users.fullName;
    console.log(this.fullName);
    this.loadMessages();
  }


  removeMessage(messageId: any) {
    this.messageService.removeMessage(messageId).subscribe(() => {
      this.isLoading = true;
      this.toaster.info('Message Deleted');
      window.location.reload();
    });
  }
  selectMessage(messageId: any) {
    this.messageId = messageId;
  }

  onImageError(event: any) {
    event.target.src = 'assets/images/g2.png';
  }

  ngOnDestroy(): void {
    this.dispose$.next(null);
    this.dispose$.complete();
  }
}
