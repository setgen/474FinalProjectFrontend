import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { ChatComponent } from './chat/chat.component';
import { GroupComponent } from './group/group.component';

const routes: Routes = [
  {path:'',redirectTo:'sign-in',pathMatch:'full'},
  {path:'home', component: HomeComponent},
  {path:'sign-in',component: SignInComponent},
  {path:'sign-up',component: SignUpComponent},
  {path:'user/:username', component: ProfileComponent},
  {path:'chat', component: ChatRoomComponent},
  {path:'groups/:id', component: GroupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
