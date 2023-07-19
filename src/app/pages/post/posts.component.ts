import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { Pagination } from 'src/app/models/pagination';
import { Post } from 'src/app/models/post';
import { Comment } from 'src/app/models/comment';
import { PostParams } from 'src/app/models/postParams';
import { UserProfile } from 'src/app/models/userProfile';
import { AccountService } from 'src/app/services/account.service';
import { FollowersService } from 'src/app/services/followers.service';
import { LoadingService } from 'src/app/services/loading.service';
import { MembersService } from 'src/app/services/members.service';

import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {
  private readonly dispose$ = new Subject();

  postForm: FormGroup | null = null;
  updatePostForm: FormGroup | null = null;
  userData: UserProfile | null = null;
  followers: UserProfile[] | null = [];
  following: UserProfile[] | null = [];
  users: UserProfile[] | null = [];
  posts: Post[] | null = [];
  postData: null | Post = null;
  imageFile: File | undefined;
  display = false;
  loading = false;
  isLike = false;
  displayModal = false;
  postParams: PostParams | null = {
    pageNumber: 1,
    pageSize: 10,
    keyword: '',
  };
  pagination: Pagination | null = null;
  loggedInUserId: string;
  isLoading: boolean = true;
  commentForm: FormGroup | null = null;
  comments: Comment[] = [];

  constructor(
    private postsService: PostsService,
    private fb: FormBuilder,
    private membersService: MembersService,
    private followersService: FollowersService,
    private accountService: AccountService,
    private toastr: ToastrService,
    private loadingService: LoadingService,
    private sanitizer: DomSanitizer
  ) {
    this.loggedInUserId = this.accountService.getLoggedInUserId();
  }

  ngOnInit(): void {
    this.isLoading = this.loadingService.isLoading;
    this.postForm = this.fb.group({
      content: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(700),
        ],
      ],
      image: [''],
    });

    this.commentForm = this.fb.group({
      content: ['', Validators.required],
      ownerImageUrl: [''],
    });

    this.loadPosts();
    this.loadUserInfo();
    this.loadUserFollowers();
    this.loadUserFollowedBy();
    this.loadUsers();
  }

  loadPosts() {
    this.isLoading = true;
    this.postsService
      .loadPosts(this.postParams!)
      .pipe(takeUntil(this.dispose$))
      .subscribe((response) => {
        this.posts = response.result;
        this.pagination = response.pagination;
        setTimeout(() => {
          this.isLoading = false;
        }, 2000);
      });
  }
  private loadUsers() {
    this.membersService
      .loadAllUsers()
      .pipe(takeUntil(this.dispose$))
      .subscribe((user) => {
        this.users = user;
        console.log(this.users);
      });
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

  removePost(postId: string) {
    this.postsService
      .removePost(postId)
      .pipe(takeUntil(this.dispose$))
      .subscribe((post: any) => {
        this.posts = post;
        window.location.href = '/posts';
      });

    this.loadPosts();
    this.toastr.warning(`Posted Deleted.`);
  }

  showDialog() {
    this.display = true;
  }

  onSubmit() {
    if (this.postForm?.invalid) {
      return;
    }

    const postFormData = new FormData();
    postFormData.append('content', this.postForm?.get('content')?.value);

    const imageInput = document.getElementById('image') as HTMLInputElement;
    const imageFile = imageInput?.files?.[0];
    if (imageFile) {
      this.loading = true;
      postFormData.append('image', imageFile);
    }

    this.postsService.createPost(postFormData).subscribe(
      (response) => {
        this.loading = false;
        this.toastr.info(`Post created`);
        window.location.href = '/posts';
      },
      (error) => {
        if (error.error && error.error.errors && error.error.errors.Content) {
          const errorMessage = error.error.errors.Content[0];
          this.toastr.warning(errorMessage);
        } else {
          this.toastr.warning('Error occurred during login');
        }
        console.error(error);
      }
    );
  }

  showPostUpdateDialog(postId: any) {
    this.displayModal = true;
    this.postsService
      .loadPost(postId)
      .pipe(takeUntil(this.dispose$))
      .subscribe((post) => {
        this.postData = post;
      });
    this.updatePostForm = this.fb.group({
      content: ['', [Validators.required]],
      image: [''],
    });
  }

  onImageChange(event: any) {
    this.imageFile = event.target.files[0];
  }

  onUpdate() {
    const data = this.updatePostForm?.value;
    const formData = new FormData();

    if (this.imageFile) {
      this.loading = true;
      formData.append('image', this.imageFile);
    }
    formData.append('content', data.content);

    if (this.postData) {
      formData.append('id', this.postData.id);
    }

    this.postsService
      .postForUpdate(formData)
      .pipe(takeUntil(this.dispose$))
      .subscribe((result) => {
        window.location.href = '/posts';
        this.loading = false;
      });

    this.toastr.info(`Post Updated.`);
  }

  onPageChanged(event: any) {
    this.postParams!.pageNumber = event.page + 1;
    this.postParams!.pageSize = event.rows;
    this.loadPosts();
  }

  getOwnerData(ownerId: string) {
    this.membersService.getOwnerData(ownerId).subscribe((userData) => {
      window.location.href = `/my-profile/${ownerId}`;
    });
  }

  private loadUserInfo() {
    this.membersService
      .loadUserProfile()
      .pipe(takeUntil(this.dispose$))
      .subscribe((userData) => {
        this.userData = userData;
      });
  }

  private loadUserFollowers() {
    this.followersService
      .currentUserFollowers()
      .pipe(takeUntil(this.dispose$))
      .subscribe((followers) => {
        this.followers = followers;
      });
  }
  private loadUserFollowedBy() {
    this.followersService
      .currentUserFollowedBy()
      .pipe(takeUntil(this.dispose$))
      .subscribe((following) => {
        this.following = following;
      });
  }

  likePost(post: Post) {
    post.isLikedByCurrentUser = !post.isLikedByCurrentUser;

    if (!post.isLikedByCurrentUser) {
      this.postsService.createLike(post.id).subscribe(
        (response: any) => {
          this.toastr.info(response.message);
        },
        (error) => {
          console.error(error);
          post.isLikedByCurrentUser = false;
        }
      );
    } else {
      this.postsService.createLike(post.id).subscribe(
        (response: any) => {
          this.toastr.info(response.message);
        },
        (error) => {
          console.error(error);
          post.isLikedByCurrentUser = false;
        }
      );
    }
  }

  wordColors: { word: any; color: any }[] = [
    { word: 'congratulations', color: 'blue' },
    { word: 'amazing', color: 'blue' },
    { word: 'good', color: 'green' },
    { word: 'awesome', color: 'purple' },
    { word: 'fantastic', color: 'orange' },
    { word: 'excellent', color: 'purple' },
  ];

  createComment(postId: string): void {
    if (this.commentForm) {
      let content = this.commentForm.value.content;

      this.wordColors.forEach((wordColor) => {
        const pattern = new RegExp(wordColor.word, 'gi');
        const replacement = `<span style="color: ${wordColor.color} !important; font-size: 17px; font-weight: bold;" >
        <i class="pi pi-book"></i>${wordColor.word}
      </span>`;

        content = content.replace(pattern, replacement);
      });

      this.postsService.createComment(postId, content).subscribe((comment) => {
        this.comments.push(comment);
        this.commentForm?.reset();
      });
    }
  }

  sanitizeCommentContent(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  postComments: { [postId: string]: Comment[] } = {};

  loadComments(postId: string): void {
    this.postsService.loadComment(postId).subscribe((comments) => {
      this.postComments[postId] = comments;
      console.log('Loaded Comments:', this.postComments[postId]);
    });
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
