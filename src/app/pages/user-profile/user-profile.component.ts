import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { Post } from 'src/app/models/post';
import { Image, Posts, UserProfile } from 'src/app/models/userProfile';
import { FollowersService } from 'src/app/services/followers.service';
import { LoadingService } from 'src/app/services/loading.service';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class MyProfileComponent implements OnInit, OnDestroy {
  private readonly dispose$ = new Subject();

  userData: UserProfile | null = null;
  userPosts:Posts[]|null=null;
  loading = false;
  userId: any;
  isFollow = false;
  isLoading = true;
  constructor(
    private memberService: MembersService,
    private followersService: FollowersService,
    private membersService: MembersService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private loadingService: LoadingService
  ) {}
  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.isLoading = this.loadingService.isLoading;

    if (this.userId) {
      this.getOwnerData();
    } else {
      this.loadUserInfo();
      this.loadCurrentUserPosts();
    }
  }
  getOwnerData() {
    this.isLoading = true;
    this.memberService.getOwnerData(this.userId).subscribe((userData) => {
      this.userData = userData;
      console.log(this.userData);
      this.isLoading = false;
    });
  }
  private loadUserInfo() {
    this.isLoading = true;
    this.memberService
      .loadUserProfile()
      .pipe(takeUntil(this.dispose$))
      .subscribe((userData) => {
        this.userData = userData;
      console.log(this.userData);

        this.isLoading = false;
      });
  }

  private loadCurrentUserPosts(){
    this.isLoading=true;
    this.memberService.loadCurrentUserPost().subscribe((res:any)=>{
      this.userPosts = res;
     console.log(this.userPosts)
    })
  }

  addImage(event: any) {
    this.loading = true;
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const formData = new FormData();
      formData.append('ImageFile', file);
      this.memberService
        .addImage(formData)
        .pipe(takeUntil(this.dispose$))
        .subscribe((res) => {
          this.userData?.images.push(res);
          window.location.reload();
        });
    };
  }

  retrieveImage() {
    var mainImage;
    if (this.userData && this.userData.images) {
      this.userData.images.forEach((image) => {
        if (image.isMain) {
          mainImage = image.imageUrl;
        }
      });
    }
    return mainImage;
  }

  setMainImage(image: Image) {
    image.isMain = true;

    this.memberService
      .updateMainImage(image)
      .pipe(takeUntil(this.dispose$))
      .subscribe((res) => {
        console.log('Main image updated');
        window.location.reload();
      });
  }
  followUser() {
    if (!this.isFollow) {
      this.isFollow = true;
      this.followersService.createFollow(this.userId).subscribe(
        (res) => {
          this.toastr.info('Follow Success');
        },
        (error) => {
          if ( error.error) {
            // const errorMessage = error.error.errors.Content[0];
            this.toastr.warning(error.error.text);
          } else {
            // this.toastr.warning('You are already follow this user');
          }
          this.toastr.warning(error.error[0]);
        }

      );
    }
  }

  message(ownerId: string) {
    this.membersService.getOwnerData(ownerId).subscribe((userData) => {
      window.location.href = `/messages/${ownerId}`;
    });
  }
  onImageError(event: any) {
    event.target.src = 'assets/images/g2.png';
  }
  ngOnDestroy(): void {
    this.dispose$.next(null);
    this.dispose$.complete();
  }
}
