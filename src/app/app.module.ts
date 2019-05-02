import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import {AuthService} from './services/auth.service';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {AuthGuard} from './guards/auth.guard';
import {NotAuthGuard} from './guards/notauth.guard';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { NguCarouselModule } from '@ngu/carousel';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    RegisterComponent,
    LoginComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FlashMessagesModule,
    NguCarouselModule,
    CarouselModule,
    BrowserAnimationsModule
  ],
  providers: [AuthService,AuthGuard,NotAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
