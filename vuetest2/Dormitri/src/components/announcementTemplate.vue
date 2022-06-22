<!-- the announcement page template -->
<!-- it is the whole html structure of the annoucemnet page -->
<!-- there are buttons using to jump pages -->
<!-- there are buttons using to use the functionalities such as create annoucement, delete announcement for the admin -->
<!-- normal user can only see the annoucement and cannot modify the annoucement -->

<template>
  <div class="container-fluid p-0 d-flex  flex-column " style="overflow-x: hidden;">
    <!--<div class="create-post">--><!--create post-->
    <!--<label for="create-post">Create Your Post: </label>
            <input type="text" id="create-post" v-model="text" placeholder="Create a post...">
            <button v-on:click="createPost()">Post it!</button>
        </div> -->
    <header class="p-0 text-black bg-light bg-gradient "  :class="{'collapse': isMobile, 'mb-2 border-bottom border-3': !isMobile}" id="topHeader" style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
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
          <!--create announcement if admin-->
            <li class="nav-item me-2 breadcrumb-item btn border-top border-bottom " id="createButton"
            data-bs-toggle="modal"
            data-bs-target="#creationModal"
            v-if="isAdmin"
          >
          CREATE ANNOUNCEMENT
            </li>
          <li class="nav-item me-2 breadcrumb-item btn border-top border-bottom" v-on:click="updatePost" id="mainpageButton">
            MAINPAGE
          </li>
        <div class="col-12 col-lg-auto mb-3 mb-lg-0 nav-item ms-auto">
          <!--search post-->
          <input
            type="text"
            id="search-post"
            class="form-control form-control-dark"
            style="border-radius: 5%"
            v-model="searchText"
            placeholder="Search something..."
          />
        </div>
        <!--search button-->
        <div class="text-end nav-item me-1">
          <button
            v-on:click="searchPost()"
            class="btn btn-md btn-outline-success me-1 ms-2 col"
          >
            Search
          </button>
        </div>

      </div>
    </header>
    <nav class="navbar navbar-light bg-light d-flex flex-column" v-if="isMobile">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#topHeader" aria-controls="topHeader" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
    <!--a modal for handling create announcements-->
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
            <h5 class="modal-title" id="creationModalLabel">NEW ANNOUNCEMENT</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <!--handle creation-->
          <div class="modal-body">
            <form class="was-validated">
              <div class="mb-3">
                <label for="recipient-name" class="col-form-label">Title</label>
                <input
                  type="text"
                  class="form-control"
                  id="recipient-name"
                  v-model="title" required
                />
                <div class="invalid-feedback">Please fill out this field.</div>
              </div>
              <div class="mb-3">
                <label for="message-text" class="col-form-label">Content</label>
                <textarea
                  class="form-control"
                  rows="6"
                  id="message-text"
                  v-model="text" required
                ></textarea>
                <div class="invalid-feedback">Please fill out this field.</div>
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
              CLOSE
            </button>
            <button
              type="button"
              class="btn btn-outline-primary"
              style="width: 20%"
              v-on:click="createPost()"
              data-bs-dismiss="modal"
              v-if="!isMobile"
            >
              PUBLISH
            </button>
            <button
              type="button"
              class="btn btn-outline-secondary"
              style="width: 20%"
              data-bs-dismiss="modal"
              v-if="isMobile"
            >
              <i class="bi bi-x-lg" style="font-size: 1rem;"></i>
            </button>
            <button
              type="button"
              class="btn btn-outline-primary"
              style="width: 20%"
              v-on:click="createPost()"
              data-bs-dismiss="modal"
              v-if="isMobile"
            >
              <i class="bi bi-check-lg" style="font-size: 1rem;"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
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
            <h5 class="fs-3">{{chosenTitle}}</h5>
              <div class="row mb-0">
              <p class="fs-6 col mb-0 fst-italic">@{{chosenUsername}}</p>
              <p class="fs-6 col mb-0 text-end">
              {{new Date(chosenTime).toLocaleDateString("en-GB", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}}
              </p>
              </div>
            <hr class="mt-1">
            <p style="white-space: pre-wrap">
            {{chosenText}}
            </p>
          </div>
          <div class="modal-footer">
          <!--if user, show close; if admin, delete/edit-->
            <button
              type="button"
              class="btn btn-outline-secondary"
              style="width: 20%"
              data-bs-dismiss="modal"
              v-if="!isAdmin"
            >
              CLOSE
            </button>
            <button
              type="button"
              class="btn btn-outline-danger"
              style="width: 20%"
              data-bs-dismiss="modal"
              v-on:click="deletePost(this.chosenID)"
              v-if="isAdmin&&!isMobile"
            >
              DELETE
            </button>
            <button
              class="btn btn-primary"
              style="width: 20%"
              data-bs-target="#editModal"
              data-bs-toggle="modal"
              v-if="isAdmin&&!isMobile"
            >
              EDIT
            </button>
            <button
              type="button"
              class="btn btn-outline-danger"
              style="width: 20%"
              data-bs-dismiss="modal"
              v-on:click="deletePost(this.chosenID)"
              v-if="isAdmin&&isMobile"
            >
              <i class="bi bi-x-lg" style="font-size: 1rem;"></i>
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
    <!--modal for edit announcements-->
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
            <h5 class="modal-title" id="editModalLabel">EDIT ANNOUNCEMENT</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form class="was-validated">
              <div class="mb-3">
                <label for="title-name" class="col-form-label">Title</label>
                <input
                  type="text"
                  class="form-control"
                  id="title-name"
                  v-model="chosenTitle" required
                />
                <div class="invalid-feedback">Please fill out this field.</div>
              </div>
              <div class="mb-3">
                <label for="edit-text" class="col-form-label">Content</label>
                <textarea
                  class="form-control"
                  rows="6"
                  id="edit-text"
                  v-model="chosenText" required
                ></textarea>
                <div class="invalid-feedback">Please fill out this field.</div>
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
              class="btn btn-success"
              style="width: 20%"
              v-on:click="editPost()"
              data-bs-dismiss="modal"
              v-if="!isMobile"
            >
              PUBLISH
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
              v-on:click="editPost()"
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
      style="height:80%; width: 98%; overflow-x: hidden !important;"
    >
      <div class="row d-flex justify-content-center">
        <div class="col list-group list-group-flush d-flex card">
          <div
            class="list-group-item list-group-item-action ps-2 pe-0 pb-0 pt-0 lh-tight d-flex"
            v-for="(post, index) in posts"
            v-bind:item="post"
            v-bind:index="index"
            v-bind:key="post._id"
          >
            <!--post panel-->
            <div class="card-body w-75" :class="{'pb-0 text-wrap w-75':isMobile} ">
              <p class="text-end w-25 float-end mb-0 fw-bold" style="white-space: pre-line; display:inline">{{ post.username }}</p>
              <p class="card-title fs-2 fw-bold lh-sm w-75" style="display:inline">{{ post.title }}</p>
              <!--enable wrap by user input-->
              <p class="card-text mb-0" v-if="!isMobile">
                {{ post.text.substring(0, 50) }}...
              </p>
              <p class="card-text mb-0" v-if="isMobile">
                {{ post.text.substring(0, 10) }}...
              </p>
              <br>
              <p class="mb-0 float-end align-self-baseline">
                {{
                  new Date(post.createdAt).toLocaleDateString("en-GB", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                }}
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
                  v-on:click="switchPost(post._id)"
                  v-if="isAdmin"
                >
                  <i class="bi bi-pencil-square" style="font-size: 2rem"></i>
                </button>
                <!--if is not admin, show list button-->
                <button
                  class="btn btn-lg border align-self-center mt-3"
                  data-bs-toggle="modal"
                  data-bs-target="#detailModal"
                  v-on:click="switchPost(post._id)"
                  v-if="!isAdmin"
                >
                  <i class="bi bi-list-ul" style="font-size: 2rem"></i>
                </button>
              </div>
            </div>
            <!--
                <button v-on:click="deletePost(post._id)">Delete Post</button>
                <button v-on:click="switchPost(post._id)">Edit Post</button>-->
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import announcementService from "../services/announcementService";
import UserService from '../services/UserService';
import { store } from "../store";
export default {
  name: "announcementTemplate",
  data() {
    return {
      username: "",
      posts: [],
      error: "",
      title: "",
      text: "",
      searchText: "",
      //edit part
      chosenText: "",
      chosenID: "",
      chosenTitle: "",
      chosenUsername: "",
      chosenTime: "",
      currentTime: 0,
      isAdmin: false,
    };
  },
  async created() {
    //initialize currentTime
    this.currentTime = new Date().toLocaleString("en-GB");
    //update posts each time a variable changes
    try {
      //parse variables from sessonstorage
      this.username = JSON.parse(sessionStorage.getItem("isLogin"))["username"];
      //check identity
      var identity = JSON.parse(sessionStorage.getItem("isLogin"))["identity"];
      if (identity == "admin") {
        this.isAdmin = true;
        //console.log(this.isAdmin)
      }
      this.posts = await announcementService.getPosts();
    } catch (err) {
      alert(err);
    }
  },
  computed: {
    isMobile: ()=>{
      return ((window.innerWidth <= 800) && (window.innerHeight <= 1200));
    },
    myInfo: ()=>{
      return store.state.myInfo
    }
  },
  mounted: function () {
    //update current time
    window.setInterval(() => {
      this.currentTime = new Date().toLocaleString("en-GB");
    }, 900);
  },
  methods: {
    //update for MAINPAGE button
    async updatePost() {
      this.posts = await announcementService.getPosts();
    },
    async createPost() {
      if (!this.text) {
        alert("Please input your text!");
        return;
      }
      if (!this.title) {
        alert("Please input a title!");
        return;
      }
      var createdAt = new Date();
      let newPost = {
        text: this.text,
        createdAt: createdAt,
        title: this.title,
        username: this.username,
      };
      await announcementService.insertPost(newPost);
      //update posts list
      this.posts = await announcementService.getPosts();
      this.text = '';
      this.title = '';
    },
    /*async createPost(){
            await announcementService.insertPost();

        },*/
    async deletePost(id) {
      await announcementService.deletePost(id);
      this.posts = await announcementService.getPosts();
    },
    //search
    async searchPost() {
      if (!this.searchText) {
        alert("Please input some text!");
        return;
      }
      this.posts = await announcementService.searchPost(this.searchText);
      //clear output
      this.searchText = "";
    },
    async switchPost(id) {
      this.chosenID = id;
      this.updateEditContent();
    },

    async updateEditContent() {
      //get post info
      await announcementService.getPostById(this.chosenID).then((req) => {
        this.chosenText = req.text;
        this.chosenTitle = req.title;
        this.chosenUsername = req.username;
        this.chosenTime = req.createdAt;
      });
    },
    async editPost() {
      if(!this.chosenTitle) {
        alert('Please input a title!');
        return;
      }
      else if(!this.chosenText) {
        alert('Please input some text!');
        return;
      }
      let editTime = new Date();
      let editedPost = {
        text: this.chosenText,
        createdAt: editTime,
        title: this.chosenTitle,
        username: this.chosenUsername,
      }
      await announcementService.editPost(editedPost, this.chosenID);
      this.posts = await announcementService.getPosts();
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
/* Works on Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 7px;
}
/* Works on Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: rgb(63, 63, 66) rgba(250, 250, 250, 0.653);
}

*::-webkit-scrollbar-track {
  background: rgba(132, 132, 132, 0);
}

*::-webkit-scrollbar-thumb {
  background-color: rgba(206, 206, 206, 0.659);
  border-radius: 20px;
  border: 3px solid rgba(63, 63, 63, 0);
}

#createButton:hover {
  background-color: rgba(198, 198, 198, 0.254);
}
#mainpageButton:hover {
  background-color: rgba(198, 198, 198, 0.254);
}
#topHeader.collapse {
  padding: 0!important;

  transition: all 0.2s cubic-bezier(0.445, 0.05, 0.55, 0.95);
}
#topHeader.show {
  padding: 1rem!important;

  transition: all 0.1s cubic-bezier(0.075, 0.82, 0.165, 1);
}
#topHeader.collapsing {
  padding: 0!important;
  transition: all 0.14s cubic-bezier(0.445, 0.05, 0.55, 0.95);
}
</style>
