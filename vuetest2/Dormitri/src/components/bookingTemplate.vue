<!-- the booking page template -->
<!-- it is the whole html structure of the booking page -->
<!-- there are buttons using to jump pages -->
<!-- there are buttons using to use the functionalities such as make a reservation and see the current facility statuses -->

<template>
  <div class="container-fluid  p-0 d-flex  flex-column">
    <header class="p-0 text-black bg-light bg-gradient " :class="{'collapse': isMobile, 'mb-2 border-bottom border-3': !isMobile}" style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb" id="topHeader">
      <!--container for header-->
      <div
        class="d-flex flex-sm-nowrap align-items-center justify-content-center justify-content-lg-start mt-1 mb-1 me-1 ms-2 nav breadcrumb" id="buttonGroup"
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
            <strong class=" fs-5">Welcome, {{ username }}.</strong>
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
          <li class="nav-item me-2 breadcrumb-item btn border-top border-bottom" v-on:click="showOverviewList()">
            OVERVIEW
          </li>
          <li class="nav-item me-2 breadcrumb-item btn border-top border-bottom" v-on:click="showMyBookingById(userid)">
            MY BOOKING
          </li>
            <li class="nav-item me-2 breadcrumb-item btn border-top border-bottom " 
            data-bs-toggle="modal"
            data-bs-target="#creationModal"
          >
          NEW BOOKING
            </li>


      </div>
    </header>
<nav class="navbar navbar-light bg-light" v-if="isMobile">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#topHeader" aria-controls="topHeader" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  </div>
</nav>
     <!--a modal for handling create bookingss-->
    <div
      class="modal fade"
      id="creationModal"
      tabindex="-1"
      aria-labelledby="creationModalLabel"
      aria-hidden="true"
    >
      <!--float panel-->
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="creationModalLabel">NEW BOOKING</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <!--handle creation-->
          <div class="modal-body row">
            <form>
              <div class="mb-3 col">
                <label for="recipient-name" class="col-form-label">Facility</label>
              <select class="form-select" v-model="fName">
                <option v-for="facility in facilityList">{{facility}}</option>
              </select>
              <select class="form-select" v-model="fID">
                <option v-for="facilityID in facilityIDList">{{facilityID}}</option>
              </select >
              </div>
              <div class="mb-3 col">
                <label for="message-text" class="col-form-label">Time</label>
               <select class="form-select " v-model="fDate">
                <option v-for="date in dateslot">{{date}}</option>
              </select>
               <select class="form-select " v-model="fTime">
                <option v-for="time in timeslot">{{time}}</option>
              </select>
              </div>
            </form>
          </div>
          <!--BUTTONS-->
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              style="width: 20%"
              data-bs-dismiss="modal"
              v-if="!isMobile"
            >
              BACK
            </button>
            <button
              class="btn btn-success"
              style="width: 20%"
              v-on:click="createBooking"
              data-bs-dismiss="modal"
              v-if="!isMobile"
            >
              SUBMIT
            </button>
            <button
              type="button"
              class="btn btn-outline-secondary"
              style="width: 20%"
              data-bs-dismiss="modal"
              v-if="isMobile"
            >
              <i class="bi bi-arrow-return-left"></i>
            </button>
            <button
              class="btn btn-outline-success"
              style="width: 20%"
              v-on:click="createBooking"
              data-bs-dismiss="modal"
              v-if="isMobile"
            >
              <i class="bi bi-check-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
<!--input group-->
              <div class="input-group d-flex" v-if="!showMyBooking">
              <!---options for college-->
             <!-- <select v-model="hostUser.college" class="form-select">

                <option v-for="cname in collegeList" :value="cname" :selected="hostUser.college==cname">{{cname}}</option>
              </select>
              -->
              <select class="form-select ms-1" v-model="fName">
                <option v-for="facility in facilityList">{{facility}}</option>
              </select>
              <select class="form-select" v-model="fID">
                <option v-for="facilityID in facilityIDList">{{facilityID}}</option>
              </select >
               <select class="form-select me-1" v-model="fDate">
                <option v-for="date in dateslot">{{date}}</option>
              </select>
              
            </div>
            <button class="btn btn-outline-success w-25 align-self-center mt-1" v-on:click="searchBookNum" v-if="!showMyBooking">VIEW</button>
<!--booking area for overview-->
  <!-- <transition name="fade"> -->
    <div v-if="showOverview"
      class="card scrollarea mt-1 align-self-center  border-3 p-0 w-75 h-75 mb-2" :class="[isMobile? 'ms-1': 'ms-3']"
      style=" overflow-x: hidden !important;"
    >
      <table class="table table-striped text-center">
  <thead>
    <tr>
      <th scope="col">Timeslot</th>
      <th scope="col">Reservations</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item,index in combinedTimeList">
      <th scope="row">{{Object.keys(item)[0]}}</th>
      <td>{{item[Object.keys(item)[0]]}}</td>
    </tr>
  </tbody>
      </table>
    </div>
 <!-- </transition> -->

    <!-- show my booking -->
  <!-- <transition name="fade"> -->
     <div v-if="showMyBooking"
      class="card scrollarea mt-1 align-self-center  border-3 p-0 mb-2" :class="[isMobile? 'ms-1  me-0': 'ms-3 w-75 h-75 ']"
      style=" overflow-x: hidden !important;"
    >
      <table class="table table-striped text-center" :class="[isMobile? 'ms-1': 'ms-3']">
  <thead>
    <tr>
      <th scope="col">Facility</th>
      <th scope="col">Date</th>
      <th scope="col">Timeslot</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(booking, index) in userBookingList" 
        v-bind:key="booking.hookID"
        v-bind:index="index">
      <th scope="row">{{booking.fName}} {{booking.fID}}</th>
      <td scope="row">{{booking.fDate}}</td>
      <td scope="row">{{booking.fTime}}</td>
      <td><i v-on:click="cancelBookingByIndex(index)" class='bi bi-x-lg' type='button'></i></td>

    </tr>
  </tbody>
      </table>
    </div>
  <!-- </transition> -->
  </div>
  
  
</template>

<script>
import BookingService from "../services/BookingService";
import UserService from '../services/UserService';
import { store } from "../store";
export default {
  name: "bookingTemplate",
  data() {
    return {


      //handle booking variables
      fName: "Studyroom",
      fID: "1",
      fDate: "",
      fTime: '0:00-0:30',
      userid: '',
      
      username: '',
      facilityStatuses: [],
      currentTime: 0,
      timeslot: [],
      bookNumList: [],
      combinedTimeList: [],
      dateslot: [],
      facilityList: ['Studyroom', 'Gym', 'WashingMachine', 'Dryer'],
      facilityIDList: [1,2,3],

      showOverview: true,
      showMyBooking: false,
      userBookingList: [],
      overviewBookingList: [],
    };
  },
  mounted: function () {
    //update current time
    window.setInterval(() => {
      this.currentTime = new Date().toLocaleString("en-GB");
    }, 900);
  },  
  computed: {
    isMobile: ()=>{
      return ((window.innerWidth <= 800) && (window.innerHeight <= 1200));
    },
    myInfo: ()=>{
      return store.state.myInfo
    }

  },
  async created() {
      this.initTimeslot();
      this.currentTime = new Date().toLocaleString("en-GB");
      this.userid = JSON.parse(sessionStorage.getItem("isLogin"))["_id"];
      this.username = JSON.parse(sessionStorage.getItem("isLogin"))["username"];
      this.searchBookNum();
      this.facilityStatuses = await BookingService.searchFacility();

  },
  methods: {
    initTimeslot(){
      // i denote as hour. get all timeslots in a day
      for(let hour=0; hour<24; hour++) {
        this.timeslot.push(`${hour}:00-${hour}:30`);
        this.timeslot.push(`${hour}:30-${hour+1}:00`);
      }
      let date = new Date();
      this.fDate = `${date.getDate()}/${date.getMonth()+1}`
      // get current dateslot for a week
      for (let i=0;i<7;i++) {
        this.dateslot.push(`${date.getDate()}/${date.getMonth()+1}`)
        date = new Date(date.setDate(date.getDate()+1))
      }
    },
    async searchBookNum(){
      //clear first
      this.combinedTimeList = [];
        this.bookNumList = [];
        console.log("time slot is")
        console.log(this.timeslot);
        for (let time in this.timeslot) {
          let query = {
          "hookID":this.timeslot[time]+this.fDate+this.fName+this.fID
        };
        console.log(query);
        let fLength = await BookingService.searchBooking(query);
            this.combinedTimeList.push({[this.timeslot[time]]:fLength.length});
        
      }
      console.log("finished searchBookNum")
      
    },
    async showMyBookingById(userid) {
      this.showOverview = false;
      this.showMyBooking = true;
      this.userBookingList = await this.searchBooking({"userid": userid});
      console.log('getlist')
      console.log(this.userBookingList)
    },

    // don't use this one, use searchBooking instead
    async searchBookingById(userid) {
      var result = await BookingService.searchFacility({"userid": userid});
      console.log("search userid in booking result is ");
      console.log(result);
      this.userBookingList = result;
    },
    async showOverviewList(){
      this.showOverview = true;
      this.showMyBooking = false;
      this.searchBookNum();
    },
    async searchBooking(query) {
      var result = await BookingService.searchFacility(query);
      // this.overviewBookingList = result;
      return result;
    },
    async cancelBookingByIndex(index) {
      let selectItem = this.userBookingList[index];
      console.log("select item is: ");
      console.log(selectItem);
      await BookingService.cancelBooking(selectItem).then(resp => {

      this.searchBookingById(this.userid);
      })

    },
    async createBooking(){
      let newQuery = {
        "hookID": this.fTime+this.fDate+this.fName+this.fID,//identical hookID for all queries going to the same slot.
        "fName": this.fName,
        "fID": this.fID,
        "userid": this.userid,
        "fTime": this.fTime,
        "fDate": this.fDate
      }
      await BookingService.createBooking(newQuery)
      this.searchBookingById(this.userid);
      if(this.showOverview){this.searchBookNum();}
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
  },
};
</script>

<style scoped>
#buttonGroup li:hover {
  background-color: rgba(198, 198, 198, 0.254);
}
#topHeader.collapse {
  padding: 0!important;

  transition: all 0.1s cubic-bezier(0.445, 0.05, 0.55, 0.95);
}
#topHeader.show {
  padding: 1rem!important;

  transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}
#topHeader.collapsing {
  padding: 0!important;
  transition: all 0.14s cubic-bezier(0.445, 0.05, 0.55, 0.95);
}
</style>
