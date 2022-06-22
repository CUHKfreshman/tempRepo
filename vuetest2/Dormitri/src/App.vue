
<template>
  <!--Side Bar, if use collapse, class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark collapse collapse-horizontal"-->
  <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark collapse collapse-horizontal multi-collapse overflow-hidden" style="height:100%; width:20%" id="sidebar" v-if="isVisible&&!isMobile">
    <div class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none multi-collapse">
      <img src="./assets/logo.svg" class="bi me-2" width="40" height="32">
      <span class="fs-4">Dormitri</span>
      <p class="text-end text-warning fs-6 p-0 mb-0" v-if="isAdmin">ADMIN VERSION</p>
    </div>
    <hr>
    <!--options-->
    <ul class="nav flex-column nav-pills mb-auto"  id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <li class="nav-item">
        
        <button class="nav-link text-white w-100 text-start" :class="{'active': this.isHome}" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" v-bind:aria-selected="isHome.toString()" v-on:click="jumpHome">
          <img src="./assets/home.png" class="bi mb-1 me-2" width="18" height="16"> Home 
        </button><!--<a href="https://www.flaticon.com/free-icons/home-button" title="home button icons">Home button icons created by Freepik - Flaticon</a>-->
      </li>
      <li class="nav-item">
        <button class="nav-link text-white w-100 text-start" :class="{'active': this.isProfile}" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" :aria-selected="isProfile.toString()" v-on:click="jumpProfile">
          <img src="./assets/profile.png" class="bi mb-1 me-2" width="18" height="16"> Profile
        </button><!--<a href="https://www.flaticon.com/free-icons/user" title="user icons">User icons created by Maxim Basinski Premium - Flaticon</a></a>-->
      </li>
      <li class="nav-item">
        <button class="nav-link text-white w-100 text-start" :class="{'active': this.isAnnounce}" id="v-pills-announcement-tab" data-bs-toggle="pill" data-bs-target="#v-pills-announcement" type="button" role="tab" aria-controls="v-pills-announcement"  :aria-selected="isAnnounce.toString()"  v-on:click="jumpAnnouncement">
          <img src="./assets/announcement.png" class="bi mb-1 me-2" width="18" height="16"> Announcement
        </button><!--<a href="https://www.flaticon.com/free-icons/announcement" title="announcement icons">Announcement icons created by Slidicon - Flaticon</a>-->
      </li>
      <li class="nav-item">
        <button class="nav-link text-white w-100 text-start"  :class="{'active': this.isBooking}" id="v-pills-booking-tab" data-bs-toggle="pill" data-bs-target="#v-pills-booking" type="button" role="tab" aria-controls="v-pills-booking" aria-selected="false" :aria-selected="isBooking.toString()"  v-on:click="jumpBooking">
          <img src="./assets/booking.png" class="bi mb-1 me-2" width="18" height="16"> Booking
        </button><!--<a href="https://www.flaticon.com/free-icons/booking" title="Booking icons">Booking icons created by Freepik - Flaticon</a>-->
      </li>
      <li class="nav-item">
        <button class="nav-link text-white w-100 text-start"   :class="{'active': this.isForum}"  id="v-pills-forum-tab" data-bs-toggle="pill" data-bs-target="#v-pills-forum" type="button" role="tab" aria-controls="v-pills-forum" aria-selected="false"  :aria-selected="isForum.toString()" v-on:click="jumpForum">
          <img src="./assets/forum.png" class="bi mb-1 me-2" width="18" height="16"> Forum
        </button><!--<a href="https://www.flaticon.com/free-icons/forum" title="forum icons">Forum icons created by Pixel perfect - Flaticon</a>-->
      </li>
      <li class="nav-item">
        <button class="nav-link text-white w-100 text-start"   :class="{'active': this.isContact}" id="v-pills-contact-tab" data-bs-toggle="pill" data-bs-target="#v-pills-contact" type="button" role="tab" aria-controls="v-pills-contact" aria-selected="false" :aria-selected="isContact.toString()"  v-on:click="jumpContact">
          <img src="./assets/contact.png" class="bi mb-1 me-2" width="18" height="16"> Contact
        </button><!--<a href="https://www.flaticon.com/free-icons/phone-call" title="phone call icons">Phone call icons created by Ilham Fitrotul Hayat - Flaticon</a>-->
      </li>
    </ul>
    <hr>
    <!--footer of sidebar-->
    <div>
      <img :src="myInfo.img" alt="" width="32" height="32" class="rounded-circle me-3">
      <strong :class="{'text-warning': isAdmin}">{{myInfo.username}}</strong>
      <button class="btn btn-sm btn-outline-warning float-end" v-on:click="logOut">Logout</button>
    </div>
  </div>
  <!--For collapsing needs-->
  <nav class="navbar navbar-dark bg-dark" v-if="isVisible&&!isMobile">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#sidebar" aria-controls="sidebar" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
  </nav>
  
<router-view/>
<!--<chatPanel/>-->
</template>
<script>
//import chatPanel from './components/chatPanel.vue'
import UserService from './services/UserService';
import {store} from './store/index';
export default {
  name: 'App',
  data() {
    return {
      isVisible: false,
      ////deal with sidebar. Because number of conditions is n^n and trivial, brute-force assignment is most stable method.
      isAdmin: false,
      isHome: true,
      isProfile: false,
      isAnnounce: false,
      isContact: false,
      isForum: false,
      isBooking: false
    }
  },
  components: {
    //chatPanel
  },
  //clear all data
  beforeDestroy() {
    sessionStorage.clear();
  },
  watch: {
      $route (to, from){
          //if in login page, sidebar invisible
          if (to.path == '/') {
            this.isVisible = false;
            //logged out
            this.isAdmin = false;
          }
          else if(from.path == '/'){
            this.isVisible = true;
            //if logged in, check identity
            if(JSON.parse(sessionStorage.getItem('isLogin'))['identity'] == 'admin') {
              this.isAdmin = true;
            }
            else {
              this.isAdmin = false;
            }
          }

          //deal with sidebar. Because number of conditions is n^n and trivial, brute-force assignment is most stable method.
          if(to.path == '/home') {
            this.isHome = true;
            this.isProfile = false;
            this.isAnnounce= false;
            this.isContact= false;
            this.isForum= false;
            this.isBooking= false;
          }
          else
          if(to.path == '/profile') {
            this.isHome = false;
            this.isProfile = true;
            this.isAnnounce= false;
            this.isContact= false;
            this.isForum= false;
            this.isBooking= false;
          }
          else 
          if(to.path == '/announcement') {
            this.isHome = false;
            this.isProfile = false;
            this.isAnnounce= true;
            this.isContact= false;
            this.isForum= false;
            this.isBooking= false;
          }
          else 
          if(to.path == '/booking') {
            this.isHome = false;
            this.isProfile = false;
            this.isAnnounce= false;
            this.isContact= false;
            this.isForum= false;
            this.isBooking= true;
          }
          else 
          if(to.path == '/contact') {
            this.isHome = false;
            this.isProfile = false;
            this.isAnnounce= false;
            this.isContact= true;
            this.isForum= false;
            this.isBooking= false;
          }
          else 
          if(to.path == '/forum') {
            this.isHome = false;
            this.isProfile = false;
            this.isAnnounce= false;
            this.isContact= false;
            this.isForum= true;
            this.isBooking= false;
          }
      },
  },
  computed: {
    myInfo: ()=> {
      //dynamicly update to keep consistency with profile page
      if(store.state.myInfo!=undefined)
        return store.state.myInfo
      else
      return JSON.parse(sessionStorage.getItem('isLogin'))
    
    },
    isMobile: ()=>{
      return ((window.innerWidth <= 800) && (window.innerHeight <= 1200));
    },
  },
  methods: {
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
  },
}
</script>

<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css");
#app {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  display: flex;/*IMPORTANT: to beatify layout*/
}

#sidebar.collapse {
  width: 0!important;
  padding: 0!important;

  transition: all 0.1s cubic-bezier(0.445, 0.05, 0.55, 0.95);
}
#sidebar.show {
  width: 20%!important;
  padding: 1rem!important;

  transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}
#sidebar.collapsing {
  width: 0!important;
  padding: 0!important;
  transition: all 0.14s cubic-bezier(0.445, 0.05, 0.55, 0.95);
}
</style>
