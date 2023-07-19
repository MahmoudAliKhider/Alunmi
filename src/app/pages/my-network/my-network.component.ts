import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { UserProfile } from 'src/app/models/userProfile';
import { FollowersService } from 'src/app/services/followers.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-my-network',
  templateUrl: './my-network.component.html',
  styleUrls: ['./my-network.component.scss'],
})
export class MyNetworkComponent implements OnInit, OnDestroy {
  private readonly dispose$ = new Subject();
  followers: UserProfile[] | null = [];
  following: UserProfile[] | null = [];
  isLoading = false;
  constructor(
    private followersService: FollowersService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.isLoading = this.loadingService.isLoading;

    this.loadUserFollowers();
    this.loadUserFollowedBy();
  }

  private loadUserFollowers() {
    this.isLoading = true;
    this.followersService
      .currentUserFollowers()
      .pipe(takeUntil(this.dispose$))
      .subscribe((followers) => {
        this.followers = followers;
        this.isLoading = false;
      });
  }
  private loadUserFollowedBy() {
    this.isLoading = true;
    this.followersService
      .currentUserFollowedBy()
      .pipe(takeUntil(this.dispose$))
      .subscribe((following) => {
        this.following = following;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.dispose$.next(null);
    this.dispose$.complete();
  }
}
