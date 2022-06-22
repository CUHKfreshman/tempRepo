<script>
import UserService from '../services/UserService';
export default {
  name: "Home",
  data() {
    return {
      username: "",
      isAdmin: false
    };
  },
  computed: {
    isMobile: ()=>{
      return ((window.innerWidth <= 1025) && (window.innerHeight <= 1200));
    },
  },
  async created() {
    try {
      // read local storage
      //console.log(typeof(sessionStorage.getItem('isLogin')))
      this.username = JSON.parse(sessionStorage.getItem("isLogin"))["username"];
      if(JSON.parse(sessionStorage.getItem("isLogin"))["identity"]=='admin'){
        this.isAdmin = true;
      }
      else {
        this.isAdmin = false;
      }
    } catch (err) {
      alert(err);
    }
  },
  methods: {
    async logOut() {
      let user = {
        username: this.username,
      };
      UserService.changeOfflineStatus(user);
      this.$router.push({ path: `/` });
    },
    async jumpAnnouncement() {
      this.$router.push({ path: `/announcement` });
    },
    async jumpContact() {
      this.$router.push({ path: `/contact` });
    },
    async jumpProfile() {
      this.$router.push({ path: `/profile` });
    },
    async jumpForum() {
      this.$router.push({ path: `/forum` });
    },
    async jumpContact() {
      this.$router.push({ path: `/contact` });
    },
    async jumpBooking() {
      this.$router.push({ path: `/booking` });
    },
  },
};
</script>

<template>
  <div class="container-fluid d-flex justify-content-center  align-items-center" v-if="!isMobile">
  <!--enter points board-->
    <div class="container-fuild w-75 align-self-center mb-2" style="height: 79%;">
    <!--one row for panel-->
      <div class="row">
        <div class="card mb-3 col me-2 border-2" style="border-top-left-radius: 4%;" id="profile">
          <div class="row g-0">
            <div class="col-md-4">
              <i class="bi bi-person-lines-fill ms-1" style="font-size: 8rem"></i>
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">Profile</h5>
                <!--different descrptions for admin and user-->
                <p class="card-text text-muted" v-if="isAdmin">Go to profile page to view and edit users' profiles.</p>
                <p class="card-text text-muted" v-if="!isAdmin">View and edit your user profile.</p>
                <button class="btn btn-outline-dark" v-on:click="jumpProfile" >ENTER</button>
              </div>
            </div>
          </div>
        </div>
        <div class="card mb-3 col border-2" style="border-top-right-radius: 4%;" id="announce">
          <div class="row g-0">
            <div class="col-md-4">
              <i class="bi bi-megaphone-fill ms-1" style="font-size: 8rem"></i>
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">Announcement</h5>
                <!--different descrptions for admin and user-->
                <p class="card-text text-muted" v-if="isAdmin">
                  Go to the announcement board to check and edit announcements.
                </p>
                <p class="card-text text-muted" v-if="!isAdmin">
                  Go to the announcement board to see the latest notifications.
                </p>
                <button class="btn btn-outline-dark" v-on:click="jumpAnnouncement" >ENTER</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row row-cols-4">
      <!--blank div for layout-->
      <div class="col col-sm-2"></div>
        <div class="card mb-3 col col-md-8 me-2 border-2" id="booking">
          <div class="row g-0">
            <div class="col-md-4">
              <i class="bi bi-journal-bookmark-fill ms-1" style="font-size: 8rem"></i>
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">Booking</h5>
                <!--different descrptions for admin and user-->
                <p class="card-text text-muted" v-if="isAdmin">Check current booking status of the facilities.</p>
                <p class="card-text text-muted" v-if="!isAdmin">Check the booking status of your interested facilities, or book a time if you wish.</p>
                <button class="btn btn-outline-dark" v-on:click="jumpBooking" >ENTER</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="card mb-3 col me-2 border-2" style="border-bottom-left-radius: 4%;" id="forum">
          <div class="row g-0">
            <div class="col-md-4">
              <i class="bi bi-people-fill ms-1" style="font-size: 8rem"></i>
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">Forum</h5>
                <!--different descrptions for admin and user-->
                <p class="card-text text-muted" v-if="isAdmin">View and manage the Dormitri forum.</p>
                <p class="card-text text-muted" v-if="!isAdmin">Check, reply, or create your own threads in the forum.</p>
                <button class="btn btn-outline-dark" v-on:click="jumpForum" >ENTER</button>
              </div>
            </div>
          </div>
        </div>
        <div class="card mb-3 col border-2" style="border-bottom-right-radius: 4%;" id="contact">
          <div class="row g-0">
            <div class="col-md-4">
              <i class="bi bi-chat-left-text-fill ms-1" style="font-size: 8rem"></i>
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">Contact</h5>
                <!--different descrptions for admin and user-->
                <p class="card-text text-muted" v-if="isAdmin">
                  Communicate with residents and solve raised issues.
                </p>
                <p class="card-text text-muted" v-if="!isAdmin">
                  Contact wardens to solve your raised issues.
                </p>
                <button class="btn btn-outline-dark" v-on:click="jumpContact" >ENTER</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid d-flex justify-content-center  align-items-center " style="overflow-y: auto;"  v-if="isMobile">
  <!--enter points board-->
    <div class="container-fuild list-group mb-5" style="height: 94%;">
    <!--one row for panel-->
        <div class="border-2 list-group-item"  id="announce">

              <div class="row">
                <i class="bi bi-megaphone-fill ms-1 col-2" style="font-size: 2rem"></i>
                <p class="col-9 text-start ps-0 mt-2 fs-4">Announcement</p>
              </div>
              
              <div class="card-body pt-0">
                <!--different descrptions for admin and user-->
                <p class="card-text text-muted" v-if="isAdmin">
                  Go to the announcement board to check and edit announcements.
                </p>
                <p class="card-text text-muted" v-if="!isAdmin">
                  Go to the announcement board to see the latest notifications.
                </p>
                <button class="btn btn-outline-dark" v-on:click="jumpAnnouncement" >ENTER</button>
              </div>
            </div>
        <div class="border-2 list-group-item" id="profile">
              <div class="row">
                <i class="bi bi-person-lines-fill ms-1 col-2" style="font-size: 2rem"></i>
                <p class="col-9 text-start ps-0 mt-2 fs-4">Profile</p>
              </div>
              <div class="card-body pt-0">

                <!--different descrptions for admin and user-->
                <p class="card-text text-muted" v-if="isAdmin">Go to profile page to view and edit users' profiles.</p>
                <p class="card-text text-muted" v-if="!isAdmin">View and edit your user profile.</p>
                <button class="btn btn-outline-dark" v-on:click="jumpProfile">ENTER</button>
              </div>

          </div>


        <div class=" border-2 list-group-item" id="booking">
          <div class="row">
              <i class="bi bi-journal-bookmark-fill ms-1 col-2" style="font-size: 2rem"></i>
              <p class="col-9 text-start ps-0 mt-2 fs-4">Booking</p>
            </div>

              <div class="card-body pt-0">
                
                <!--different descrptions for admin and user-->
                <p class="card-text text-muted" v-if="isAdmin">Check current booking status of the facilities.</p>
                <p class="card-text text-muted" v-if="!isAdmin">Check the booking status of your interested facilities, or book a time if you wish.</p>
                <button class="btn btn-outline-dark" v-on:click="jumpBooking" >ENTER</button>
              </div>
            </div>

        <div class="border-2 list-group-item" id="forum">
          <div class="row">
              <i class="bi bi-people-fill ms-1 col-2" style="font-size: 2rem"></i>
              <p class="col-9 text-start ps-0 mt-2 fs-4">Forum</p>
          </div>

              <div class="card-body pt-0">
                
                <!--different descrptions for admin and user-->
                <p class="card-text text-muted" v-if="isAdmin">View and manage the Dormitri forum.</p>
                <p class="card-text text-muted" v-if="!isAdmin">Check, reply, or create your own threads in the forum.</p>
                <button class="btn btn-outline-dark" v-on:click="jumpForum" >ENTER</button>
              </div>
            </div>

        <div class=" border-2 list-group-item" id="contact">
          <div class="row">
              <i class="bi bi-chat-left-text-fill ms-1 col-2" style="font-size: 2rem"></i>
              <p class="col-9 text-start ps-0 mt-2 fs-4">Contact</p>
          </div>
              <div class="card-body pt-0">
                <!--different descrptions for admin and user-->
                <p class="card-text text-muted" v-if="isAdmin">
                  Communicate with residents and solve raised issues.
                </p>
                <p class="card-text text-muted" v-if="!isAdmin">
                  Contact wardens to solve your raised issues.
                </p>
                <button class="btn btn-outline-dark" v-on:click="jumpContact" >ENTER</button>
              </div>
            </div>


    </div>
  </div>

</template>

<style scoped>
#announce {
  background-color: rgb(255, 213, 221);
}
#profile {
  background-color: #ffe7c7;
}
#booking {
  background-color: #e1f8dc;
}
#contact {
  background-color: #acddde;
}
#forum {
  background-color: #caf1de;
}
</style>
