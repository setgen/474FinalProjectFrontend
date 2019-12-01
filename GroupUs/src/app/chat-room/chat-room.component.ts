import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { stringify } from 'querystring';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {

  user_id:String = "null";
  group_id:String = "null";
  token:string = "null"

  constructor() { }

  ngOnInit() {
    console.log("hi");
    axios.get('localhost:5000/api/users/user_id')
      .then((response) => {
        this.token = response.data.token;
        console.log(this.token);
      });
  }



  //socket:any = io();

  messages:HTMLElement = document.getElementById("messages");

  public send(message: String) {
    console.log("tried to send");
    axios.post('http://localhost:5000/api/groups/messages', {
      _id: "5dd33e887d505528f8527336",
      text: 'This is a test.',
      time_sent: '00:00',
      sendUserName: "Steve"
    });
  }

  public append() {
console.log("appended");




  // axios({
  // method: 'get',
  // url: 'localhost:5000/api/users/user_id',
  // headers: {}, 
  // data: {
  //   username: "mtmiller",
	//   password: "cisc474"
  // }
  // })
  // .then((response) => {
  //   this.token = response.data.token;
  //   console.log(this.token);
  // });
      
  axios.get('http://localhost:5000/api/users/group_id',
  {
    params:{
      username:'mtmiller',
      password:'cisc474'
    }
  })
      .then((response) => {
        this.group_id = response.data.group_id
      });


    let li = document.createElement("li");
    let span = document.createElement("span");
    var messages = document.getElementById("messages");
    var message = <HTMLInputElement>document.getElementById("message");
    // messages.appendChild(li).append(message.value);
    messages.appendChild(li).append(this.token);
    axios({
      method: 'get',
      url: 'localhost:5000/api/users/user_id',
      headers: {}, 
      data: {
        username: "mtmiller",
        password: "cisc474"
      }
      })
      .then((response) => {
        this.token = response.data.token;
        console.log("here");
        console.log(this.token);
      });
    // axios.get('http://localhost:5000/api/users/user_id')
    // .then((response) => {
    //   this.user_id = response.data.user;
    // });
    messages.appendChild(span).append("by " + this.user_id + ": " + "just now");




    console.log(this.token);
  }

  // axios.post('http://localhost:3000/chat/users', { userId })
  //     .then(() => {
  //       const tokenProvider = new Chatkit.TokenProvider({
  //         url: 'http://localhost:3000/chat/authenticate'
  //       });
  

}
