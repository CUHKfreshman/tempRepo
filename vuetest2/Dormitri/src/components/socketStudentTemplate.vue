<!-- socket student(normal user) template -->
<!-- it is different with the admin -->

<template>

<div class="container-fluid ms-0 p-0 me-0 d-flex bd-highlight flex-column">
    <header class="p-0 text-black bg-light bg-gradient " style="--bs-breadcrumb-divider: '>';" :class="{'mb-0 collapse': isMobile, 'mb-2 border-bottom border-3': !isMobile}" aria-label="breadcrumb" id="topHeader">
      <!--container for header-->
      <div
        class="d-flex flex-sm-nowrap align-items-center justify-content-center justify-content-lg-start mt-1 mb-1 me-1 ms-2 nav breadcrumb"
      >
        <!--user info and time-->
          <img
            :src="myInfo.img"
            alt=""
            width="60"
            height="60"
            class="rounded-circle me-2 border border-2 border-dark nav-item" v-if="!isMobile"
          />

          <p class="p-2 me-2 breadcrumb-item">
            <strong class=" fs-5">Welcome, {{ myInfo.username }}.</strong>
            <br />
            <small  class="text-muted fs-6">Current time: {{ currentTime }}</small>
          </p>
            <li class="nav-item me-2 breadcrumb-item btn border-top border-bottom  dropdown"
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
      </div>
    </header>
  <nav class="navbar navbar-light bg-light d-flex flex-column" v-if="isMobile">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#topHeader" aria-controls="topHeader" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
  </nav>




  <!--chat room-->
  <chatRoom v-if="!show"/>
  <!--cover div for contact request-->
  <div v-if="show&&!isMobile" class="container-fluid bg-light bg-gradient h-100 justify-content-center align-items-center d-flex">
  
<!--live chat-->
      <div class="card w-25 border-4 p-2" id="chatcontainer">
        <img src="../assets/chat.png" alt="" class="card-img-top p-5 hover-zoom"><!--<a href="https://www.flaticon.com/free-icons/chat" title="chat icons">Email icons created by Freepik - Flaticon</a>-->
        <div class="card-body text-wrap">
          <h1 class="card-title">LIVE CHAT</h1>
          <p class="card-text">Contact an online warden in real time.</p>
        <button type="button" class="btn btn-lg btn-outline-info" v-on:click="contactWarden">ENTER A CHANNEL</button>
        </div>
      </div>
      <div style="width: 15rem;"></div>

<!--email-->
      <div class="card w-25 border-4 p-2" id="emailcontainer">
        <img src="../assets/email.png" alt="" class="card-img-top p-5"><!--<a href="https://www.flaticon.com/free-icons/email" title="email icons">Email icons created by Freepik - Flaticon</a>-->
        <div class="card-body text-wrap">
          <h1 class="card-title">EMAIL</h1>
          <p class="card-text">Communicate with warden via email.</p>
          <!-- Button trigger modal -->
        <button type="button" class="btn btn-lg btn-outline-info " data-bs-toggle="modal" data-bs-target="#staticBackdrop">GET AN ADDRESS</button>
        <!-- Vertically centered modal -->
        <!-- Modal -->
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog  modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header text-uppercase">
                <h3 class="modal-title" id="staticBackdropLabel">{{emailAdmin.username}}</h3>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                {{emailAdmin.email}}
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>

  </div>
  <div v-if="show&&isMobile" class="container-fluid bg-light bg-gradient h-100 justify-content-center align-items-center d-flex">
  
    <div class="list-group">
    <!--live chat-->
      <div class="list-group-item" id="chatcontainerMob">
        <i class="bi bi-chat-dots-fill" style="font-size: 2rem;"></i>
        <div class="card-body text-wrap">
          <h1 class="card-title">LIVE CHAT</h1>
          <p class="card-text">Contact an online warden in real time.</p>
        <button type="button" class="btn btn-lg btn-outline-info" v-on:click="contactWarden">ENTER A CHANNEL</button>
        </div>
      </div>
      <div style="width: 15rem;"></div>

<!--email-->
      <div class="list-group-item" id="emailcontainerMob">
        <i class="bi bi-envelope-fill" style="font-size: 2rem;"></i>
        <div class="card-body text-wrap">
          <h1 class="card-title">EMAIL</h1>
          <p class="card-text">Communicate with warden via email.</p>
          <!-- Button trigger modal -->
        <button type="button" class="btn btn-lg btn-outline-info " data-bs-toggle="modal" data-bs-target="#staticBackdrop">GET AN ADDRESS</button>
        <!-- Vertically centered modal -->
        <!-- Modal -->
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog  modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header text-uppercase">
                <h3 class="modal-title" id="staticBackdropLabel">{{emailAdmin.username}}</h3>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                {{emailAdmin.email}}
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>

  </div>
</div>

</template>

<script>
import {store} from "../store/index";
import chatRoom from "./chatRoom.vue";
import UserService from '../services/UserService';
export default {
  name: "socketTemplate",
  data() {
    return {
      show: true,
      inputMsg: '',
      selectedAdmin: null,
      emailAdmin: ''
    }
  },
  components: {
    chatRoom
  },

  sockets: {
      connect: function() {
        console.log('Connect successfully.');
      },
      disconnect: function() {
        console.log('Disconnected.');
        this.show = true;
      },
      reconnect: function() {
        console.log('Reconnected.');
      },
      
  },
  created(){
    this.currentTime =  new Date().toLocaleString("en-GB");
    UserService.searchUserEmail().then(resp=>{
      this.emailAdmin = resp.data;
    })
    this.$socket.connect();//JSON.parse(sessionStorage.getItem('isLogin'))['_id']
    /*if (JSON.parse(sessionStorage.getItem('isLogin'))['identity']=="admin"){
      this.$socket.emit("join", {roomID: ["1155141667", "1155141668"]});
    }
    else{*/
    this.$socket.emit("login",this.myInfo,(result)=>
      {
        if(result) {
        store.commit('setMyInfo', this.myInfo)
        }
      }
    );

  },
  mounted() {
     //inti Popover all 
    //  Array.from(document.querySelectorAll('button[data-bs-toggle="popover"]'))
    //.forEach(popoverNode => new Popover(popoverNode))
    window.setInterval(() => {
      this.currentTime = new Date().toLocaleString("en-GB");
    }, 900);
  },
  computed: {
    adminList(){
      return store.state.adminList;
    },    
    myInfo: ()=>{
      return store.state.myInfo;
    },
    isMobile: ()=>{
      return ((window.innerWidth <= 1025) && (window.innerHeight <= 1200));
    },
  },
  methods: {
      contactWarden(){
        var time = new Date();
        // random select an online admin
        //console.log(Math.floor(this.adminList.length * Math.random()))
        // if no admin online, return
        if(this.adminList.length==0){
          alert('No admin online now. Try another time!');
          return
        }
        this.show = false;
        this.selectedAdmin = this.adminList[Math.floor(this.adminList.length * Math.random()) | 0];
        console.log(`Choose to contact:`,this.selectedAdmin)
        let data={
              type:'my',
              sender: this.myInfo,
              receiver: this.selectedAdmin,//receiver info
              time:time.toLocaleTimeString(),//send time
              msg: `${this.myInfo['_id']} has joined the room.`,//First message
          }
        this.$socket.emit('privateChat',data);
          /* push message to self vue directly */
        store.commit('SOCKET_updateChatMessageList',data);
        store.commit('setReceiverInfo',this.selectedAdmin);
        /* clear input box*/
        this.input='';
      },
      sendMsg(text){
        let data={
              type:'my',
              sender: this.myInfo,
              receiver: this.selectedAdmin,//receiver info
              time:time.toLocaleTimeString(),//send time
              msg: text,//text
          }
        this.$socket.emit('privateChat',data);
          /* push message to self vue directly */
        store.commit('SOCKET_updateChatMessageList',data);
        /* clear input box*/
        this.input='';
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

#chatcontainer {
  background-color: rgb(235, 251, 255)!important;
  transition: all 0.5s ease;
}
#chatcontainer:hover {
  background-color: rgba(162, 241, 255, 0.722)!important;
  width: 28%!important;
  transition: all 0.5s ease;
}

#emailcontainer {
  background-color: rgb(235, 251, 255)!important;
  transition: all 0.5s ease;
}
#emailcontainer:hover {
  background-color: rgba(162, 241, 255, 0.722)!important;
  width: 28%!important;
  transition: all 0.5s ease;
}


</style>