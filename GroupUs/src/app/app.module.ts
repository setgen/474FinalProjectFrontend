import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { MatToolbarModule, MatIconModule, MatInputModule, MatSelectModule, 
  MatSidenavModule, MatListModule, MatButtonModule } from  '@angular/material';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { ProfileComponent } from './profile/profile.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { UserService } from './user.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    MenuBarComponent,
    ProfileComponent,
    ChatRoomComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,  
    MatInputModule, 
    MatButtonModule,
    MatSelectModule,
    MatIconModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
