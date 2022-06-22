<!-- the profile end template -->
<!-- it is the whole html structure of profile end -->
<!-- there are buttons using to change password, modifing profile image, etc. -->
<!-- the profiles for normal user and admin are different-->
<!-- there are buttons using to jump pages -->

<template>
  <div class="container-fluid p-0 d-flex  flex-column" style="overflow-y: auto; overflow-x: hidden;">
    <!--Header-->
    <header
      class="p-0 text-black border-bottom border-3 mb-2 bg-light bg-gradient"
      style="--bs-breadcrumb-divider: '>'"
      aria-label="breadcrumb"
    >
      <!--container for header-->
      <div
        class="d-flex flex-sm-nowrap align-items-center justify-content-center justify-content-lg-start mt-1 mb-1 me-1 ms-2 nav breadcrumb"
      >
        <!--user info and time-->
        <p class="p-2 me-2 breadcrumb-item">
          <strong class="fs-5 ">Welcome, {{ hostUser.username }}.</strong>
          <br />
          <small class="text-muted fs-6">Current time: {{ currentTime }}</small>
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
        <!--extra options only for admin-->
          <li class="nav-item me-2 breadcrumb-item btn border-top border-bottom " v-on:click="showMyInfo=true;showUserManagement=false" id="myinfoButton">
            MY INFO
            </li>
          <li class="nav-item me-2 breadcrumb-item btn border-top border-bottom" v-on:click="showMyInfo=false;showUserManagement=true" v-if="hostUser.identity=='admin'" id="usermanageButton">
            USER MANAGEMENT
          </li>
      </div>
    </header>

  <div v-if="showMyInfo" class="container bg-white p-0 pt-5 d-flex flex-column" :class="[isMobile? 'mt-0': 'mt-4']">
  <!--inline panels-->
      <div class="row">
      <!--user avatar-->
        <div class="col-md-3 border-end">
          <div class="d-flex flex-column align-items-center text-center ps-0 p-3 py-2 pe-0">
          <span class="position-relative"><i class="bi bi-camera-fill position-absolute bottom-0 end-0" type="button" style="font-size: 2.4rem;" v-on:click="jumpPhotoUpload" ></i>
            <img
              :src="hostUser.img"
              alt=""
              width="150"
              height="150"
              class="rounded-circle me-2 border border-2 border-dark mt-2 nav-item mb-2"
            />
          </span>
          <!-- used for click camera button-->
    <form @submit="uploadAvatar" method="post" enctype="multipart/form-data" id="photoForm" style="display:none">
      <input type="file" :name="upload_profile_photo" accept="image/*" id="photoInput" style="display:none" @change="onUploadAvatar($event.target.name, $event.target.files, $event.target.files.length)">
   </form>
            <span class="fw-bold fs-4">{{ hostUser.username }}</span
            ><span class="text-muted">{{ hostUser.email }}</span
            ><span> </span>
          </div>
        </div>
        <!--user setting container-->
        <div class="col-md-5 border-end">
          <div class="p-3 py-3">
            <div class="d-flex justify-content-between align-items-center">
              <h4 class="text-start">User Settings</h4>
            </div>

            <!--user personal information-->

            <div class="row">
            <!--User name-->
              <div class="col-md-6 mt-3">
                <label class="labels">Name</label
                >
                <div class="input-group">
                  <span class="input-group-text" id="basic-addon1">@</span>
                  <input type="text" class="form-control" v-model="editUsername" :aria-label="editUsername" aria-describedby="basic-addon1">
                </div>
              </div>
              <!--password-->
              <div class="col-md-5 align-content-between flex-wrap mt-3">
                <label class="labels mb-auto">Password</label
                >
                <button
                class="btn btn-danger align-self-baseline "
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                Change Password
              </button>
              </div>
            </div>
            <div class="row mt-3">
            <!--User ID-->
              <div class="col-md-6 mb-3">
                <label class="labels">User ID</label
                >
                  <input type="text" class="form-control" :placeholder="hostUser._id" disabled>

              </div>
              <!--User identity-->
              <div class="col-md-6 mb-1">
                <label class="labels">Identity</label
                ><input
                  type="text"
                  class="form-control"
                  :placeholder="hostUser.identity"
                  aria-label="Disabled input example" disabled
                />
              </div>
              <!--User email-->
              <div class="col-md-12 mb-3">
                <label class="labels">Email Address</label
                ><input
                  type="text"
                  class="form-control"
                  :placeholder="hostUser.email"
                   aria-label="Disabled input example" disabled
                />
              </div>
              <!--User status-->
              <div class="col-md-12 mb-3">
                <label class="labels">User Status</label
                ><input
                  type="text"
                  class="form-control"
                  :placeholder="hostUser.userStatus"
                   aria-label="Disabled input example" disabled
                />
              </div>
            </div>
            <!--upload image-->
          </div>
          
        </div>
        <!--accommodation information container-->
        <div class="col-md-4 pe-0">
          <div class="p-3 py-3 pe-0">
            <div class="d-flex justify-content-between align-items-center experience">
              <h4 class="text-start text-wrap">Residence Info</h4>
            </div>
              <!--- college-->
              <div class="col-md-12 mb-3 mt-3">
                <label class="labels">College</label
                >
              </div>
              <div class="input-group mb-3 w-75">
              <!---options for college-->
              <select v-model="hostUser.college" class="form-select">

                <option v-for="cname in collegeList" :value="cname" :selected="hostUser.college==cname">{{cname}}</option>
              </select>
              
            </div>
            <!--hostel-->
              <div class="col-md-12 mb-3 w-75">
                <label class="labels">Hostel</label
                >
              <div class="input-group mb-3">
              <!---options for hostel-->
              <select v-model="hostUser.hostel" class="form-select">

                <option v-for="hname in hostelList" :value="hname" :selected="hostUser.hostel==hname">{{hname}}</option>
              </select>
            </div>
              </div>
              <div class="col-md-12 mb-3 w-75">
                <label class="labels">Room</label
                ><input
                  type="text"
                  class="form-control"
                  :placeholder="hostUser.room"
                  v-model="hostUser.room"
                />
              </div>
          </div>
        </div>
<!--button for edit submission-->
            <div class="mt-0 mb-3 text-center">
              <button
                class="btn btn-primary"
                type="button"
                v-on:click="updateProfile"
              >
                Update Profile
              </button>
            </div>
      </div>
<!--modal for reset password-->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog  modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Change Your Password</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <label for="passworda" class="form-label">Enter a new password:</label>
        <input type="password" class="form-control mb-2" id="passworda" aria-describedby="basic-addon3" v-model="passworda">
        <label for="passwordb" class="form-label">Please input again:</label>
        <input type="password" class="form-control" id="passwordb" aria-describedby="basic-addon3" v-model="passwordb">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary" v-on:click="updatePassword()">Submit</button>
      </div>
    </div>
  </div>
</div>
    </div>

<!--modal for password changing--->
<!-- Button trigger modal -->

  <!-- USER MANAGEMENT -->
    <!--modal for handling double jump detail/edit-->

    <!--modal for viewing detail-->
    <div
      class="modal fade"
      id="detailModal"
      aria-hidden="true"
      aria-labelledby="detailModalLabel"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="detailModalLabel"></h4>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <!--detail body-->
          <div class="modal-body">
            <h5 class="fs-3">{{chosenUserId}}</h5>
              <div class="row mb-0">
              <p class="fs-6 col mb-0 fst-italic">{{chosenUsername}}</p>
              </div>
            <hr class="mt-1">
            <p style="white-space: pre-wrap">
            {{chosenUserEmail}}
            </p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-danger"
              style="width: 25%"
              data-bs-dismiss="modal"
              v-on:click="resetUserPassword(this.chosenUserId, this.chosenUsername, this.chosenUserEmail)"
              v-if="isAdmin&&!isMobile"
            >
              RESET PASSWORD
            </button>
            <button
              class="btn btn-primary"
              style="width: 20%"
              data-bs-target="#editModal"
              data-bs-toggle="modal"
              v-if="isAdmin&&!isMobile"
            >
              VIEW PROFILE
            </button>
            <button
              type="button"
              class="btn btn-outline-danger"
              style="width: 20%"
              data-bs-dismiss="modal"
              v-on:click="resetUserPassword(this.chosenUserId, this.chosenUsername, this.chosenUserEmail)"
              v-if="isAdmin&&isMobile"
            >
              <i class="bi bi-arrow-clockwise" style="font-size: 1rem;"></i>
            </button>
            <button
              class="btn btn-outline-primary"
              style="width: 20%"
              data-bs-target="#editModal"
              data-bs-toggle="modal"
              v-if="isAdmin&&isMobile"
            >
              <i class="bi bi-pencil-fill" style="font-size: 1rem;"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--modal for profile-->
    <div
      class="modal fade"
      id="editModal"
      aria-hidden="true"
      aria-labelledby="editModalLabel"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editModalLabel">User Profile</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              id="closeModalUserFile"
            ></button>
          </div>
          <span class="position-relative" style="width: 10rem;"> <i class="bi bi-camera-fill position-absolute"  type="button" style="font-size: 2.4rem; top:72%; left:75%" v-on:click="jumpPhotoUpload" ></i>
            <img
              :src="chosenUserImg"
              alt=""
              width="150"
              height="150"
              class="rounded-circle me-2 border border-2 border-dark mt-2 nav-item mb-0 ms-2"
            />
          </span>
      
          
    <form @submit="uploadAvatar" method="post" enctype="multipart/form-data" id="photoForm2" style="display:none">
      <input type="file" :name="upload_profile_photo" accept="image/*" id="photoInput2" style="display:none" @change="onUploadAvatar($event.target.name, $event.target.files, $event.target.files.length)">
   </form>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="title-name1" class="col-form-label">Username</label>
                <input
                  type="text"
                  class="form-control"
                  id="title-name1"
                  v-model="chosenUsername"
                />
              </div>
              <div class="mb-3">
                <label for="title-name11" class="col-form-label">Password</label>
                <input
                  type="text"
                  class="form-control"
                  id="title-name11"
                  v-model="chosenUserPassword"
                />
              </div>
              <div class="mb-3">
                <label for="title-name2" class="col-form-label">Email</label>
                <input
                  type="text"
                  class="form-control"
                  id="title-name2"
                  v-model="chosenUserEmail"
                />
              </div>
              <div class="mb-3">
                <label for="title-name3" class="col-form-label">College</label>
                <input
                  type="text"
                  class="form-control"
                  id="title-name3"
                  v-model="chosenUserCollege"
                />
              </div>
              <div class="mb-3">
                <label for="title-name4" class="col-form-label">Hostel</label>
                <input
                  type="text"
                  class="form-control"
                  id="title-name4"
                  v-model="chosenUserHostel"
                />
              </div>
              <div class="mb-3">
                <label for="title-name5" class="col-form-label">Room</label>
                <input
                  type="text"
                  class="form-control"
                  id="title-name5"
                  v-model="chosenUserRoom"
                />
              </div>
              <div class="mb-3">
                <label for="title-name6" class="col-form-label">Identity</label>
                <input
                  type="text"
                  class="form-control"
                  id="title-name6"
                  v-model="chosenUserIdentity"
                />
              </div>
              <div class="mb-3">
                <label for="title-name7" class="col-form-label">User Status</label>
                <input
                  type="text"
                  class="form-control"
                  id="title-name7"
                  v-model="chosenUserStatus"
                />
              </div>
            </form>

          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              style="width: 20%"
              data-bs-target="#detailModal"
              data-bs-toggle="modal"
              v-if="!isMobile"
            >
              BACK
            </button>
            <button
              type="button"
              class="btn btn-outline-primary"
              style="width: 20%"
              v-on:click="updateAllInfo()"
              data-bs-dismiss="modal"
              v-if="!isMobile"
            >
              UPDATE
            </button>
            <button
              type="button"
              class="btn btn-outline-secondary"
              style="width: 20%"
              data-bs-target="#detailModal"
              data-bs-toggle="modal"
              v-if="isMobile"
            >
              <i class="bi bi-arrow-return-left"></i>
            </button>
            <button
              class="btn btn-outline-success"
              style="width: 20%"
              v-on:click="updateAllInfo()"
              data-bs-dismiss="modal"
              v-if="isMobile"
            >
              <i class="bi bi-send-fill"></i>
            </button>
          </div>
        </div>
      </div>
    </div>


    <!--announcement area-->
    <div
      class="card scrollarea mt-4  border-3 p-0 " :class="[isMobile? 'ms-1': 'ms-3']"
      style="height:80%; width: 98%; overflow-x: hidden !important;" v-if="showUserManagement"
    >
      <div class="row d-flex justify-content-center">
        <div class="col list-group list-group-flush d-flex card">
          <div
            class="list-group-item list-group-item-action ps-2 pe-0 pb-0 pt-0 lh-tight d-flex"
            v-for="(user, index) in users"
            v-bind:item="user"
            v-bind:index="index"
            v-bind:key="user._id"
          >
            <!--post panel-->
            <div class="card-body w-75" :class="{'pb-0 text-wrap w-75':isMobile} ">
              <p class="text-end w-25 float-end mb-0 fw-bold" style="white-space: pre-line; display:inline">{{ user._id }}</p>
              <p class="card-title fs-2 fw-bold lh-sm w-75" style="display:inline">{{ user.username }}</p>
              <br>
              <!--enable wrap by user input-->
              <p class="card-text mb-0">
               {{ user.email }}
              </p>
              <br>
              <p class="mb-0 float-end align-self-baseline">
                {{user.userStatus}}
              </p>
            </div>
            <!--footer containing buttons; width=25% if is mobile-->
            <div class="card-footer pt-0 pb-0 border-0 border-start" :class="{'w-25':isMobile}">
              <div class="mt-4">
                <!--if is admin, show edit & delete button -->
                <!--delete-->
                <!--edit-->
                <button
                  class="btn btn-lg border align-self-center mt-3"
                  data-bs-toggle="modal"
                  data-bs-target="#detailModal"
                  v-on:click="switchPost(user._id)"
                  v-if="isAdmin"
                >
                  <i class="bi bi-pencil-square" style="font-size: 2rem"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
import UserService from "../services/UserService";
import PhotoService from '../services/PhotoService';
import {store} from '../store/index';
export default {
  data() {
    return {
      currentTime: 0,
      // host user object
      hostUser: '',
      //for edit only, because hostUser.username has other usages in the page.
      editUsername: "",
      //deal with double check
      passworda: "",
      passwordb: "",

      // user: '',
      username: "",
      users: [],
      error: "",
      title: "",
      text: "",
      searchText: "",
      //edit part
      chosenUserId: "",
      chosenUserEmail: "",
      chosenUsername: "",
      chosenUserImg: "",
      chosenUserPassword: "",
      chosenUserHostel: "",
      chosenUserCollege: "",
      chosenUserRoom: "",
      chosenUserStatus: "",
      chosenUserIdentity: "",
      chosenTime: "",
      currentTime: 0,
      isAdmin: false,

      collegeList: [
        "Chung Chi College",
        "New Asia College" ,
        "United College",
        "Shaw College",
        "Morningside College",
        "S.H. Ho College",
        "CW Chu College",
        "Wu Yee Sun College", 
        "Lee Woo Sing College", 
      ],

      hostelList: [
         "A",
         "B", 
         "C", 
         "D", 
      ],

      //handle photo upload
      fileupload: '',
      userid: '',
      fileCount: '',
      upload_profile_photo: 'profile',
      profile_photo_location: '/tmp',
      file_extension: '',

      //handle switch
      showMyInfo: true,
      showUserManagement: false
    };
  },
  computed: {

  },
  async created() {
        //current time initialzation
      this.currentTime = new Date().toLocaleString("en-GB");
      //get user info
      let hostID = JSON.parse(sessionStorage.getItem("isLogin"))['_id'];
      this.hostUser = this.getUser(hostID);
      //update posts each time a variable changes
      try {
        //parse variables from sessonstorage
        this.username = JSON.parse(sessionStorage.getItem("isLogin"))["username"];
        //check identity
        var identity = JSON.parse(sessionStorage.getItem("isLogin"))["identity"];
        if (identity == "admin") {
          this.isAdmin = true;
        }
        let userdata = await UserService.getUsers();
        this.users = userdata.data;
        console.log(this.users);
      } catch (err) {
        alert(err);
      }
  },
  mounted: function () {
    //update current time
    window.setInterval(() => {
      this.currentTime = new Date().toLocaleString("en-GB");
    }, 1000);
  },

  computed: {
    isMobile: ()=>{
      return ((window.innerWidth <= 800) && (window.innerHeight <= 1200));
    },
    userimg: ()=>{
      return store.state.myInfo.img
    }
  },
    methods: {    
      //TODO: just used for userlist, do not use in MY INFO page because all parameters has been in the sessionStorage
    // Return an "user" Object can be simplifier. Check created().
      async getUser(userid) {
        UserService.searchUserById(userid).then(resp => 
        {
        this.hostUser = resp.data;
        this.editUsername = resp.data.username;
        });
      },
    //update profile
    updateProfile() {
      let updatedUser = this.hostUser;
      //username splited before
      updatedUser.username = this.editUsername;
      console.log("send profile");
      console.log(updatedUser)
      UserService.updateUserProfile(updatedUser);
      //update local memory
      sessionStorage.setItem['isLogin'] = updatedUser;
      store.commit("setMyInfo", updatedUser);
      alert("Profile changed successfully!");
    },

    updateAllInfo(){
      let newUser = {
      "_id": this.chosenUserId,
      "email": this.chosenUserEmail,
      "password": this.chosenUserPassword,
      "identity": this.chosenUserIdentity,
      "username": this.chosenUsername,
      "college": this.chosenUserCollege,
      "hostel": this.chosenUserHostel,
      "userStatus": this.chosenUserStatus,
      "room": this.chosenUserRoom 
        };
      UserService.updateAllInfo(newUser);
      this.updateUsersList();
    },
    //update password
    updatePassword() {
      //e.preventDefault();
      //two inputs
      let p1 = this.passworda;
      let p2 = this.passwordb;
      console.log("p1 " + p1);
      console.log(p2);
      if (p1 === "" || p2 === "") {
        alert("Empty password is not allowed!");
      } else if (p1 != p2) {
        alert("Two passwords are not the same!");
      } else {
        const updatedUser = {
          _id: this.hostUser._id,
          password: this.passworda,
        };
        UserService.updateUserPassword(updatedUser);
        alert("Password changed successfully!");
        this.passworda = "";
        this.passwordb = "";
      }
    },
    //jump file uploader
    jumpPhotoUpload(){
      if(this.showMyInfo)
    document.getElementById("photoInput").click();
    else
    document.getElementById("photoInput2").click();
    },
    //process uploading
    onUploadAvatar(e, file, fileCount){
        console.log('heard image transfer')
        this.fileCount = fileCount;
        if (this.fileCount!=1) {
            alert("You should only upload one single image!");
        }
        this.fileupload = file;
        console.log("file");
        console.log(file);
        var extension = file[0].type.split('/').pop();
        var type = file[0].type.split('/')[0];
        console.log(this.fileCount + " is filecount!");
        if (type != "image") {
            alert("You should only upload file of type images!");
        }
        else {
        this.file_extension = extension;
        var formData = new FormData();
        if(this.showMyInfo){
          formData.append("name", this.hostUser._id);
        }
        else{
          formData.append("name", this.chosenUserId);
        }
        formData.append(this.upload_profile_photo, file[0]);
        console.log(formData);
        this.formData = formData;
        // PhotoService.insertPhoto(formData);
        this.uploadAvatar();
        }
    },
    //trigger upload procedure
    uploadAvatar(){
        //e.preventDefault();
        PhotoService.insertPhoto(this.formData);
        var httpStart = "http://localhost:8000/";
        // var newUrl = "file://" + this.profile_photo_location + "/profile-" + this.userid + "." + this.file_extension;

        if(this.showMyInfo)
        {
          var newUrl = httpStart + "profile-" + this.hostUser._id + "." + this.file_extension + "#" + new Date().getTime();
          const newUser = {"_id": this.hostUser._id, "img": newUrl};
        UserService.updateUserPhoto(newUser).then(resp=>
        {
          if(resp.status == 201) {
            console.log("get user after update user photo!");
            this.getUser(this.hostUser._id);
            let updatedUser = this.hostUser;
            updatedUser.img = newUrl;
            store.commit("setMyInfo", updatedUser);
          }
        });
        }
        else
        {
          var newUrl = httpStart + "profile-" + this.chosenUserId + "." + this.file_extension + "#" + new Date().getTime();
          const newUser = {"_id": this.chosenUserId, "img": newUrl};
          console.log(newUser)
        UserService.updateUserPhoto(newUser).then(resp=>
        {
          if(resp.status == 201) {
            console.log("get user after update user photo2!");
            this.updateUsersList();
            document.getElementById('closeModalUserFile').click();
          }
        });
        }

            
    },
    async updateUsersList(){
        let userdata = await UserService.getUsers();
        this.users = userdata.data;
    },
    async switchPost(id) {
      this.chosenUserId = id;
      this.updateEditContent();
    },

    async updateEditContent() {
      //get post info
      await UserService.searchUserById(this.chosenUserId).then((req) => {
        console.log(this.chosenUserId + " is id");
        console.log("req.data");
        console.log(req.data);
        this.chosenUserEmail = req.data.email;
        this.chosenUserId = req.data._id;
        this.chosenUserPassword = req.data.password;
        this.chosenUsername = req.data.username;
        this.chosenUserHostel = req.data.hostel;
        this.chosenUserCollege = req.data.college;
        this.chosenUserRoom = req.data.room;
        this.chosenUserStatus = req.data.userStatus;
        this.chosenUserIdentity = req.data.identity;
        this.chosenUserImg = req.data.img;
        // if (!this.chosenUserCollege) this.chosenUserCollege = "Currently not available";
        // if (!this.chosenUserRoom) this.chosenUserRoom = "Currently not available";
        // if (!this.chosenUserHostel) this.chosenUserHostel = "Currently not available";
      });
    },
    async resetUserPassword(userid, username, email) {
      await UserService.updateUserPasswordByAdmin({"_id": userid, "username": username, "email": email});
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
#myinfoButton:hover {
  background-color: rgba(198, 198, 198, 0.254);
}
#usermanageButton:hover {
  background-color: rgba(198, 198, 198, 0.254);
}
</style>
