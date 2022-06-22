<!-- socket admin template -->
<!-- it is different with the normarl user -->

<template>

<div class="container-fluid ms-0 p-0 me-0 d-flex bd-highlight">
  <!--sidebar for chat list-->
  <div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-white h-100 w-25 border-end" v-if="!isMobile">
    <a href="#" class="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom border-3">
      <img src="../assets/logo.svg" class="bi me-2" width="30" height="24">
      <span class="fs-5 fw-semibold" v-if="!isMobile">Active Channels</span>
    </a>
    <!--chat list-->
    <div class="list-group list-group-flush border-bottom scrollarea overflow-auto" style=""><!--active if change chat list-->
      <button href="#" class="list-group-item list-group-item-action py-3 lh-tight" :class="{'active': users.username==receiverInfo.username}" v-for="users in userList" v-on:click="changeRoom(users)" >
        <div class="d-flex w-100 align-items-center justify-content-between">
          <strong class="mb-1">{{users.username}}</strong>
          <small :id="users._id+'time'"></small>
        </div>
        <div class="d-flex flex-row justify-content-start mb-1 ms-2">
          <img :src="users.img" alt="" width="60" height="60" class="rounded-circle me-2 border border-2 border-dark">
          <!--insert heading text-->
          <p class="small p-2 ms-1 mb-1 rounded-3 text-wrap" :id="users._id+'heading'"></p>
          <!--new msg indicator-->
          <img src="../assets/bell.png" alt="" width="20" height="20" class="rounded-circle me-2 " :id="users._id+'bell'">
          <!--<a href="https://www.flaticon.com/free-icons/alert" title="alert icons">Alert icons created by Pixel perfect - Flaticon</a>-->
        </div>
      </button>
    </div>
  </div>
<button class="btn btn-light position-fixed translate-middle" style="left: 85%;top:7%" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvaser" aria-controls="offcanvaser" v-on:click="disableAlert">
<i class="bi bi-chat" style="font-size: 1.5rem;"><span class="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-2" id="alertmsg" style="display:none"><span class="visually-hidden">unread messages</span></span></i></button>

<div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvaser" aria-labelledby="offcanvasLabel" v-if="isMobile">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
  <div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-white h-100 w-100 border-end">
    <a href="#" class="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom border-3">
      <img src="../assets/logo.svg" class="bi me-2" width="30" height="24">
      <span class="fs-5 fw-semibold" v-if="!isMobile">Active Channels</span>
    </a>
    <!--chat list-->
    <div class="list-group list-group-flush border-bottom scrollarea overflow-auto" style=""><!--active if change chat list-->
      <button href="#" class="list-group-item list-group-item-action py-3 lh-tight" :class="{'active': users.username==receiverInfo.username}" v-for="users in userList" v-on:click="changeRoom(users)" >
        <div class="d-flex w-100 align-items-center justify-content-between">
          <strong class="mb-1">{{users.username}}</strong>
          <small :id="users._id+'time'"></small>
        </div>
        <div class="d-flex flex-row justify-content-start mb-1 ms-2">
          <img :src="users.img" alt="" width="60" height="60" class="rounded-circle me-2 border border-2 border-dark">
          <!--insert heading text-->
          <p class="small p-2 ms-1 mb-1 rounded-3 text-wrap" :id="users._id+'heading'"></p>
          <!--new msg indicator-->
          <img src="../assets/bell.png" alt="" width="20" height="20" class="rounded-circle me-2 " :id="users._id+'bell'">
          <!--<a href="https://www.flaticon.com/free-icons/alert" title="alert icons">Alert icons created by Pixel perfect - Flaticon</a>-->
        </div>
      </button>
    </div>
  </div>
  </div>
</div>
  <div class="vr" style="padding: 0.05rem; color: aliceblue;"></div>
  
  <!--chat room-->
  <chatRoom/>
</div>

</template>

<script>
import {store} from "../store/index"
import chatRoom from "./chatRoom.vue"
export default {
    name: "socketTemplate",
    data() {
        return {
            isConnected: false,
            incomingMsg: null
        };
    },
    sockets: {
        connect: function () {
            this.isConnected = true;
            console.log("Connect successfully.");
        },
        disconnect: function () {
            this.isConnected = false;
            console.log("Disconnected.");
        },
        reconnect: function () {
            this.isConnected = true;
            console.log("Reconnected.");
        },//get real-time update for list headings
        updateChatMessageList: function(msg){
          document.getElementById(msg.sender._id+"time").innerText = msg.time;
          document.getElementById(msg.sender._id+"heading").innerText = msg.msg.substring(0,15)+'...';
          // new msg come in
          document.getElementById(msg.sender._id+"bell").src = 'src/assets/bell-ring.png';
          document.getElementById('alertmsg').style = 'display: block';
        }
    },
    created() {
        this.$socket.connect(); //JSON.parse(sessionStorage.getItem('isLogin'))['_id']
        /*if (JSON.parse(sessionStorage.getItem('isLogin'))['identity']=="admin"){
          this.$socket.emit("join", {roomID: ["1155141667", "1155141668"]});
        }
        else{*/
        this.$socket.emit("login", this.myInfo, (result) => {
            if (result) {
                store.commit("setMyInfo", this.myInfo);
            }
        });
    },
    beforeDestroy() {
        this.$socket.close();
    },
    computed: {
        userList() {
            return store.state.userList;
        },
        receiverInfo() {
            return store.state.receiverInfo;
        },
        messageList() {
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
      disconnectSocket() {
        this.$socket.emit("disconnect");
        this.$socket.close();
      },
      // switch chatroom
      changeRoom(userInfo){
          store.commit('setReceiverInfo', userInfo)
          document.getElementById(userInfo._id+"bell").src = 'src/assets/bell.png';
        },
        // disable new message alert by clicking on the button
        disableAlert(){
          document.getElementById('alertmsg').style = 'display: none';
        },

    },
    components: { chatRoom }
};
</script>

<style scoped>

</style>