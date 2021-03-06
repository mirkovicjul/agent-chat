import { Component, OnInit, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private msg;
  private ws:WebsocketService;
  private router:Router;

  constructor(private rt:Router, private injector:Injector) {
     this.router = rt;
     this.ws = injector.get(WebsocketService);
  }

  ngOnInit() {
    this.ws.myMessagesMilli = [];
    this.ws.myMessagesDate = [];
    this.ws.myGroupMessagesMilli = [];
    this.ws.myGroupMessagesDate = [];
    this.ws["friend"] = null;
    this.ws["group"] = null;
    if(this.ws["logged"]==false){
      this.router.navigateByUrl('/');
    }
  }

  searchUser(data){
      if(data.username==undefined){
        data.username = "";
      }
      if(data.name==undefined){
        data.name="";
      }
      if(data.surname==undefined){
        data.surname="";
      }
      this.msg = "{\"type\":\"user_search\","
      + "\"data\":{"
      + "\"searcher\":\"" + this.ws["username"] + "\","
      + "\"username\":\"" + data.username + "\","
      + "\"name\":\"" + data.name + "\","
      + "\"surname\":\"" + data.surname + "\"}"
      + "}";
      console.log(this.msg);
      this.ws.sendMsg(this.msg);
      //this.router.navigateByUrl('/search');
  }

  

  logout(){
    this.msg = "{\"type\":\"logout\","
              + " \"data\":{"
              + " \"username\":\"" + this.ws["username"] + "\"}"
              + "}";
    console.log(this.msg);
    this.ws["logged"]=false;
    this.ws.sendMsg(this.msg);
  }

  deleteFriend(username){
    this.msg = "{\"type\":\"friend_remove\","
    + " \"data\":{"
    + "\"sender\":\"" + this.ws["username"] + "\","
    + "\"receiver\":\"" + username + "\"}"
    + "}";
    console.log(this.msg);
    this.ws.sendMsg(this.msg);
    for(var i = 0; i < this.ws.myFriends.length; i++){
      if(this.ws.myFriends[i]==username){
        this.ws.myFriends.splice(i,1);
        break;
      }
    }
    for(var i = 0; i < this.ws.onlineFriends.length; i++){
      if(this.ws.onlineFriends[i]==username){
        this.ws.onlineFriends.splice(i,1);
        break;
      }
    }

    for(var i = 0; i < this.ws.offlineFriends.length; i++){
      if(this.ws.offlineFriends[i]==username){
        this.ws.offlineFriends.splice(i,1);
        break;
      }
    }
  }

  acceptRequest(username){
      this.msg = "{\"type\":\"friend_accept\","
      + " \"data\":{"
      + "\"sender\":\"" + this.ws["username"] + "\","
      + "\"receiver\":\"" + username + "\"}"
      + "}";
      console.log(this.msg);
      this.ws.sendMsg(this.msg);

      this.ws.myFriends.push(username);
      for(var i = 0; i < this.ws.myReceivedRequests.length; i++){
        if(this.ws.myReceivedRequests[i]==username){
            this.ws.myReceivedRequests.splice(i,1);
            break;
        }
      }
      var flag = false;
      for(var i = 0; i < this.ws.onlineUsers.length; i++){
          if(this.ws.onlineUsers[i]==username){
            this.ws.onlineFriends.push(username);
            flag = true;
            break;
          }
      }
      if(!flag){
        this.ws.offlineFriends.push(username);
      }
  
  }

  declineRequest(username){
    this.msg = "{\"type\":\"friend_reject\","
    + " \"data\":{"
    + "\"sender\":\"" + this.ws["username"] + "\","
    + "\"receiver\":\"" + username + "\"}"
    + "}";
    console.log(this.msg);
    this.ws.sendMsg(this.msg);

    for(var i = 0; i < this.ws.myReceivedRequests.length; i++){
      if(this.ws.myReceivedRequests[i]==username){
        this.ws.myReceivedRequests.splice(i,1);
        break;
      }
    }
  }
}
