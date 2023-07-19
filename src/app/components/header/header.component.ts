import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { PresenceService } from 'src/app/services/presence.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentUser$ = this.accountService.currentUser$;
  user!: User | undefined;
  menuItems = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      routerLink: '/posts',
      routerLinkActiveOptions: { exact: true },
    },
    {
      label: 'My Network',
      icon: 'pi pi-users',
      routerLink: '/my-network',
      routerLinkActiveOptions: { exact: true },
    },
    {
      label: 'Messages',
      icon: 'pi pi-inbox',
      routerLink: '/messages',
      routerLinkActiveOptions: { exact: true },
    },
    {
      label: `tracks`,
      icon: 'pi pi-book',
      items: [
        {
          label: 'roadMap',
          icon: 'pi pi-arrow-right',
          routerLink: '/roadMap',
          routerLinkActiveOptions: { exact: true },
        },
        {
          label: 'tracks',
          icon: 'pi pi-book',
          command: () => this.router.navigateByUrl('/courses'),
        },
      ],
    },

    {
      label: `me`,
      icon: 'pi pi-user',
      items: [
        {
          label: 'Profile',
          icon: 'pi pi-user',
          command: () => this.router.navigateByUrl('/my-profile'),
        },
        {
          label: 'cha_pass',
          icon: 'pi pi-key',
          command: () => this.router.navigateByUrl('/change_pass'),
        },

        {
          label: 'Logout',
          icon: 'pi pi-sign-out',
          command: () => {
            this.logout();
          },
        },
      ],
    },
  ];

  constructor(
    private accountService: AccountService,
    private persenceService: PresenceService,
    private router: Router
  ) {
    accountService.currentUser$.subscribe((newuser) => {
      this.user = newuser;
    });
  }

  ngOnInit(): void {
    this.setCurrentUser();
  }

  logout() {
    this.persenceService.stopHubConnection();
    localStorage.removeItem('user');
    window.location.href = '/';
  }

  private setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user') as any);
    if (user) {
      this.accountService.setUserToLocalStorage(user);
      // this.persenceService.createHubConnection(user);
    }
  }
}
