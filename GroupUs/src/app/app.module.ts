import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { GroupComponent } from './group/group.component'
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { ProfileComponent } from './profile/profile.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { SharedModule } from './shared/shared.module';
import { ChatModule } from './chat/chat.module';
import { ApiService } from './api.service';
import { MatToolbarModule, MatSidenavModule, MatListModule, MatInputModule, MatButtonModule, MatSelectModule, MatIconModule } from '@angular/material';
import { SocketService } from './chat/shared/services/socket.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    MenuBarComponent,
    ProfileComponent,
    ChatRoomComponent,
    GroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,  
    MatInputModule, 
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    ChatModule,
    BrowserAnimationsModule
  ],
  providers: [ApiService, SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
