<!-- the contact (chat room) page template -->
<!-- it is the whole html structure of the chat room page -->
<!-- there are buttons using to jump pages -->
<!-- there are buttons using to use the functionalities sending massage to the warden -->

<template>
  <div class="container-fluid bg-white h-100 d-flex flex-column">
      <!--heading-->
    <div class="align-items-center flex-shrink-0 p-3 w-100 ms-0 link-dark text-decoration-none border-bottom fs-5 fw-bold row" :class="{'mb-0 pb-0':isMobile}">
        <div class="col-sm-10 nav" :class="{'mb-2':isMobile}">
          <img :src="receiverInfo.img" alt="" width="60" height="60" class="rounded-circle me-2 border border-2 border-dark">
            <li class="nav-item me-2 breadcrumb-item btn border-bottom border-top dropdown mb-0 pb-0 ms-3"
            v-if="isMobile"
          >
          <a class="nav-link dropdown-toggle text-black p-0"  href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            NAVIGATOR
          </a>

          <ul class="dropdown-menu" aria-labelledby="navbarDarkDropdownMenuLink">
              <li><button class="dropdown-item" type="button" v-on:click="jumpHome">Home</button></li>
              <li><button class="dropdown-item" type="button" v-on:click="jumpProfile">Profile</button></li>
              <li><button class="dropdown-item" type="button" v-on:click="jumpAnnouncement">Announcement</button></li>
              <li><button class="dropdown-item" type="button" v-on:click="jumpBooking">Booking</button></li>
              <li><button class="dropdown-item" type="button" v-on:click="jumpForum">Forum</button></li>
              <li><button class="dropdown-item" type="button" v-on:click="jumpContact">Contact</button></li>
              <li><button class="dropdown-item text-danger" type="button" v-on:click="logOut">Logout</button></li>
          </ul>
            </li>
            <p class="p-0 mb-0" v-if="!isMobile">
            
              <strong>{{receiverInfo.username}}</strong>
              <br />
        <!--{{currentTime}}-->
              <small class="fs-6 text-muted fw-normal">Current time is: {{ currentTime }}</small>
            </p>
            <p class="p-0 mb-0 mt-1" v-if="isMobile">
              <strong class="">{{receiverInfo.username}}</strong>
              <br/>
        <!--{{currentTime}}-->
              <small class="fs-6 text-muted fw-normal">{{ currentTime }}</small>
            </p>
            
        </div>
        <!--disconnect-->
        <button class="btn btn-sm btn-outline-danger float-end col-sm" v-on:click="disconnectSocket" v-if="myInfo.identity!='admin'">DISCONNECT</button>
    </div>
    <!--chat content-->
    <div class="card scrollarea " style="height: 70%; overflow-x: hidden!important;" id="chatContainer">
      <div class="row d-flex justify-content-center">
        <div class="col">
        <!-- for messages in messageList-->
        <br>
          <div  v-for="msgBody in messageList">
            
            <!--if incoming message's receiver is me and sender is the current counterpart, render user msg-->
            <div class="d-flex flex-row justify-content-start mb-0 ms-2" v-if="((msgBody.receiver.username==myInfo.username)&&(msgBody.sender.username==receiverInfo.username))">
              <img :src="msgBody.sender.img" alt="" width="60" height="60" class="rounded-circle me-2 border border-2 border-dark">
              <div>
                <p class="small p-2 ms-3 mb-1 rounded-3 text-wrap" style="background-color: #f5f6f7; max-width:15rem">{{msgBody.msg}}</p>
                <p class="small ms-3 mb-3 rounded-3 text-muted">{{msgBody.time}}</p>
              </div>
            </div>
                <!--else if receiver is counterpart and sender is me, render my msg-->
            <div class="d-flex flex-row justify-content-end mb-0 me-2" v-else-if="myInfo.identity!='admin'||((msgBody.receiver.username==receiverInfo.username)&&(msgBody.sender.username==myInfo.username))">
              <div>
                <p class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary text-wrap" style="max-width: 15rem;">{{msgBody.msg}}</p>
                <p class="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">{{msgBody.time}}</p>
              </div>
              <img :src="myInfo.img" alt="" width="60" height="60" class="rounded-circle me-2 border border-2 border-dark">
            </div>
            
          </div>


        </div>

      </div>
    </div>
    <!--message input-->
    <div class="card-footer text-muted d-flex justify-content-start align-items-center" style="height: 7.4rem;" :class="{'p-0':isMobile}">
     <img :src="myInfo.img" alt="" width="75" height="75" class="rounded-circle me-2 border border-2 border-dark ms-2" v-if="!isMobile">
      <div class="form-floating float-buttom mt-1 w-75 " :class="{'ms-5':!isMobile, 'ms-3':isMobile}">
        <textarea class="form-control w-100 h-75 rounded-pill" placeholder="Leave a comment here" id="floatingTextarea2" rows="2" style="resize: none;" v-model="inputText"></textarea>
        <label for="floatingTextarea2">Type message</label>
      </div>
      <button class="ms-5 btn btn-outline-primary float-end" style="width: 5.5rem;" v-if="!isMobile" v-on:click="sendMsg">SEND</button>
      <i class="bi bi-send ms-4" style="font-size: 1.4rem;" type="button" v-on:click="sendMsg" v-if="isMobile"></i>
    </div>
  </div>
</template>
<script>
import UserService from '../services/UserService';
import {store} from "../store/index"
export default {
  name: "chatRoom",
  data() {
    return {
      isConnected: false,
      currentTime: '',
      inputText:''
    }
  },
  sockets: {
    connect: function() {
        this.isConnected = true;
        console.log('Connect successfully.');
        },
    disconnect: function() {
        this.isConnected = false;
        console.log('Disconnected.');
        },
    reconnect: function() {
        this.isConnected = true;
        console.log('Reconnected.');
        }
    },
    created() {
      this.currentTime = new Date().toLocaleString('en-GB')
    },
    mounted: function () {
        window.setInterval(() => {
        this.currentTime = new Date().toLocaleString('en-GB')
        }, 900)
    },
  computed: {
    userList(){
      return store.state.userList;
    },
    receiverInfo(){
      return store.state.receiverInfo;
    },
    messageList(){
        
      return store.state.chatMessageList;
    },
    myInfo(){
        return store.state.myInfo;
    },
    isMobile: ()=>{
      return ((window.innerWidth <= 800) && (window.innerHeight <= 1200));
    }
  },
  methods: {
      sendMsg(){
        if(this.inputText.length==0){
            alert('Please input text!');
            return
        }
        let data={
            type:'my',
            sender: this.myInfo,
            receiver: this.receiverInfo,//receiver info
            time:new Date().toLocaleTimeString(),//send time
            msg: this.inputText,//text
          }
          console.log('Sent message');
          console.log(data)
        this.$socket.emit('privateChat',data);
          /* push message to self vue directly */
        store.commit('SOCKET_updateChatMessageList',data);
        //to bottom
        document.getElementById('chatContainer').scrollTo(0,10000);
        /* clear input box*/
        this.inputText='';
      },
      disconnectSocket(){
        let data={
            type:'my',
            sender: this.myInfo,
            receiver: this.receiverInfo,//receiver info
            time:new Date().toLocaleTimeString(),//send time
            msg: `${this.myInfo['_id']} has left the room.`,//text
        }
        this.$socket.emit('privateChat',data);
          /* push message to self vue directly */
        store.commit('SOCKET_updateChatMessageList',data);
        this.$socket.emit("disconnect");
        this.$socket.close();
      },
  
  
    logOut(){
      let user = {
        'username': JSON.parse(sessionStorage.getItem('isLogin'))['username']
      };
      UserService.changeOfflineStatus(user);
      sessionStorage.clear();
      this.$router.push({path:`/`});
    },
    jumpAnnouncement(){
        this.$router.push({path:`/announcement`});
    },
    jumpContact(){
        this.$router.push({path:`/contact`});
    },
    jumpProfile(){
        this.$router.push({path:`/profile`});
    },
    jumpHome(){
        this.$router.push({path:`/home`});
    },
    jumpBooking(){
        this.$router.push({path:`/booking`});
    },
    jumpForum(){
        this.$router.push({path:`/forum`});
    }

  }
};
</script>

<style scoped>

</style>