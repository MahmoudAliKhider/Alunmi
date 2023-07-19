import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { PrimeNgModule } from './shared/primeng.module';

import { JwtInterceptor } from './interceptors/jwt.interceptor';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MyNetworkComponent } from './pages/my-network/my-network.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { PostsComponent } from './pages/post/posts.component';

import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MyProfileComponent } from './pages/user-profile/user-profile.component';
import { ToastrModule } from 'ngx-toastr';
import { LoadingComponent } from './components/loading/loading.component';
import { ChangePassComponent } from './pages/change-pass/change-pass.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { RoadmapComponent } from './pages/roadmap/roadmap.component';
import { MapComponent } from './pages/map/map.component';
import { CoursesComponent } from './pages/courses/courses.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PostsComponent,
    MyNetworkComponent,
    MessagesComponent,
    NotFoundComponent,
    MyProfileComponent,
    LoadingComponent,
    ChangePassComponent,
    ResetPasswordComponent,
    RoadmapComponent,
    MapComponent,
    CoursesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }), // ToastrModule added

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
