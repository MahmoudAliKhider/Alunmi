import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { LoggedGuard } from './guards/logged.guard';

import { NotFoundComponent } from './components/not-found/not-found.component';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { MyNetworkComponent } from './pages/my-network/my-network.component';
import { RegisterComponent } from './pages/register/register.component';
import { PostsComponent } from './pages/post/posts.component';
import { MyProfileComponent } from './pages/user-profile/user-profile.component';
import { ChangePassComponent } from './pages/change-pass/change-pass.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { RoadmapComponent } from './pages/roadmap/roadmap.component';
import { MapComponent } from './pages/map/map.component';
import { CoursesComponent } from './pages/courses/courses.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [LoggedGuard],
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
    ],
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'posts', component: PostsComponent },
      { path: 'change_pass', component: ChangePassComponent },
      { path: 'my-profile/:id', component: MyProfileComponent },
      { path: 'my-profile', component: MyProfileComponent },
      { path: 'my-network', component: MyNetworkComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'messages/:id', component: MessagesComponent },
      { path: 'roadMap', component: RoadmapComponent },
      { path: 'map/:id', component: MapComponent },
      { path: 'courses', component: CoursesComponent },
    ],
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
