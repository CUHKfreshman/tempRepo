<!-- the comment page template -->
<!-- it is the whole html structure of the forum page -->
<!-- there are buttons using to jump pages -->
<!-- there are buttons using to use the functionalities iteract with comments -->

<template>
<div class="container-fluid  p-0 d-flex  flex-column" style="overflow-x: hidden;">
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

          <li class="nav-item me-2 breadcrumb-item btn border-top border-bottom" v-on:click="getAllPosts" id="mainpageButton">
            MAINPAGE
          </li>
            <li class="nav-item me-2 breadcrumb-item btn border-top border-bottom " id="createButton"
            data-bs-toggle="modal"
            data-bs-target="#creationModal"
          >
          CREATE THREADS
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

    <div
      class="card scrollarea   border-3 p-0 " :class="[isMobile? 'ms-1': 'ms-3']"
      style="height:80%; width: 98%; overflow-x: hidden !important;"
    >
    <!--posts container-->
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
            <div class="card-body" :class="{'pb-0 text-wrap w-75':isMobile} " >
              <p class="text-end w-50 float-end mb-0" :class="{'fw-bold':!isMobile, 'fs-6':isMobile}" style="white-space: pre-line;">{{ post.username }}</p>

              <br v-if="isMobile">
              <p class="card-title fs-2 fw-bold lh-sm" v-if="!isMobile">{{ post.title }}</p>
              <p class="card-title fs-6 fw-bold lh-sm" v-if="isMobile">{{ post.title }}</p>
              <!--enable wrap by user input-->
              <p class="card-text mb-0" v-if="!isMobile">
                {{ post.text.substring(0, 50) }}...
              </p>
              <br>
              <p class="mb-0 float-end align-self-baseline" v-if="!isMobile">
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
                <!--show list button-->
                <button
                  class="btn btn-lg border align-self-center" :class="{'mt-3':!isMobile, 'mt-0 mb-3':isMobile}"
                  data-bs-toggle="modal"
                  data-bs-target="#detailModal"
                  v-on:click="switchPost(post._id)"
                >
                  <i class="bi bi-list-ul"  style="font-size: 2rem" :style="{'font-size: 2rem':!isMobile, 'font-size: 1rem':isMobile}"></i>
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
    <!--Modal for creation-->
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
            <h5 class="modal-title" id="creationModalLabel">NEW THREAD</h5>
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
                    <label for="newTitle" class="form-label">Title</label>
                    <input v-model="newThreadTitle" class="form-control" required id="newTitle"/>
                <div class="invalid-feedback">Please fill out this field.</div>
                </div>
                <div class="mb-3">
                  <label for="newThread" class="form-label">Contents</label>
                  <textarea class="form-control" v-model="newThreadContent" rows=5 required id="newThread"></textarea>
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
              v-on:click="createPost"
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
              v-on:click="createPost"
              data-bs-dismiss="modal"
              v-if="isMobile"
            >
              <i class="bi bi-check-lg" style="font-size: 1rem;"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
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
            <h4 class="modal-title" id="detailModalLabel">THREAD</h4>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <!--detail body-->
          <div class="modal-body " style="overflow-wrap: break-word;">
            <h5 class="fs-3">{{chosenTitle}}</h5>
              <img :src="chosenUserImg" alt="" class="rounded-circle me-2 border border-2 border-dark align-self-start" width="60" height="60">
              <div class="row mb-0">
              <p class="fs-6 col mb-0 fst-italic">@{{chosenUsername}}</p>
              <p class="fs-6 col mb-0 text-end" v-if="!isMobile">
              {{new Date(chosenTime).toLocaleDateString("en-GB", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}}
              </p>
              <p class="fs-6 col mb-0 text-end" v-if="isMobile">
              {{new Date(chosenTime).toLocaleDateString("en-GB", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}}
              </p>
              </div>
            <p style="white-space: pre-wrap fs-6">
            {{chosenText}}
            </p>
            <hr>
        <div class = "container pull-right md-6  p-1">
    <div class="comments bg-light " v-for="(comment, index) in comments" v-bind:item="comment" v-bind:index="index" v-bind:key="comment._id">
        <div class="flex-shrink-0 ms-1 ">
            <img :src="comment.userimg" alt="" class="rounded-circle me-2 border border-2 border-dark align-self-start mt-2" width="60" height="60">
            
            <p class="float-end me-1 mt-1">Floor #{{index+1}}</p>
        </div>
        <div class="flex-grow-1 ms-1 ">
            <h5 class="fst-italic fs-6">@{{comment.username}}</h5>
            <p class="fs-6">{{comment.text}}</p>
        </div>

        </div>
          </div>
          </div>
          <div class="modal-footer">
          <!--if user, show close/reply; if admin, delete/reply-->
            <button
              type="button"
              class="btn btn-outline-secondary"
              style="width: 20%"
              data-bs-dismiss="modal"
              v-if="!isAdmin&&!isMobile"
            >
              CLOSE
            </button>
            <button
              type="button"
              class="btn btn-outline-danger"
              style="width: 20%"
              data-bs-dismiss="modal"
              v-on:click="deletePost(this.chosenPostID)"
              v-if="isAdmin&&!isMobile"
            >
              DELETE
            </button>
            <button
              class="btn btn-success"
              style="width: 20%"
              data-bs-target="#editModal"
              data-bs-toggle="modal"
              v-if="!isMobile"
              
            >
              REPLY
            </button>
            <button
              type="button"
              class="btn btn-outline-danger"
              style="width: 20%"
              data-bs-dismiss="modal"
              v-on:click="deletePost(this.chosenPostID)"
              v-if="isAdmin&&isMobile"
            >
              <i class="bi bi-x-lg" style="font-size: 1rem;"></i>
            </button>
            <button
              class="btn btn-outline-success"
              style="width: 20%"
              data-bs-target="#editModal"
              data-bs-toggle="modal"
              v-if="isMobile"
            >
              <i class="bi bi-reply-all-fill" style="font-size: 1rem;"></i>
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
            <h5 class="modal-title" id="editModalLabel">NEW REPLY</h5>
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
                <label for="edit-text" class="col-form-label">Content</label>
                <textarea
                  class="form-control"
                  rows="6"
                  id="edit-text"
                  v-model="newThreadContent" required
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
              v-on:click="addComment"
              data-bs-target="#detailModal"
              data-bs-toggle="modal"
              v-if="!isMobile"
            >
              CONFIRM
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
              v-on:click="addComment"
              data-bs-target="#detailModal"
              data-bs-toggle="modal"
              v-if="isMobile"
            >
              <i class="bi bi-send-fill"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import CommentService from '../services/CommentService';
import PostService from '../services/PostService';
import UserService from '../services/UserService';
import { store } from '../store';

export default {
    data() {
        return {
          currentTime: 0,
          userid: 0,
          username: '',
          userimg: '',
          isAdmin: false,

          posts: '',
          searchText: '',

          // create post
          newThreadContent: '',
          newThreadTitle: '',
          textMaxLength: 20,

          // for viewing details
          chosenPostID: '',
          chosenUserID: 0,
          chosenText: '',
          chosenTitle: '',
          chosenUsername: '',
          chosenTime: '',
          chosenUserImg: '',


          //deal with comments
          showComment: true,
          comments: [],
          newThreadContent: '',
        }
    },
   async created(){
    this.currentTime = new Date().toLocaleString("en-GB");
    this.userid = JSON.parse(sessionStorage.getItem('isLogin'))['_id'];
    this.username = JSON.parse(sessionStorage.getItem('isLogin'))['username'];
    if(JSON.parse(sessionStorage.getItem('isLogin'))['identity']=='admin'){
      this.isAdmin = true;
    }
    else{
      this.isAdmin = false;
    }
    this.getAllPosts();
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
     // get all
    async getAllPosts(){
      let allposts = await PostService.getPosts();
      // this.posts = allposts.map(eachpost => ({...eachpost, active: false}));
      this.posts = allposts;
    },
    async createPost(){
      var createdAt = new Date();
      if(!this.newThreadContent) {
        alert('Please input the content!');
        return;
      }
      else if(!this.newThreadTitle) {
        alert('Please input a title!');
        return;
      }
      let newThread = {"text": this.newThreadContent, "createdAt": createdAt, "title": this.newThreadTitle,"userid":this.userid, "username": this.username};
      console.log(newThread);
      await PostService.insertPost(newThread);
      // this.posts = await PostService.getPosts();
      this.getAllPosts();
      this.newThreadContent = ''
      this.newThreadTitle = ''
    },
    // delete
    async deletePost() {
        await PostService.deletePost(this.chosenPostID);
        this.deleteCommentsByPostId(this.chosenPostID);
        this.getAllPosts();
    },
    // search
    async searchPost(){
        this.posts = await PostService.searchPost(this.searchText);
    },
    // switch to the chosen thread
    async switchPost(id) {
      this.chosenPostID = id;
      this.getAllComments();
      this.updateEditContent();
    },

    // get current thread info
    async updateEditContent() {
      //get post info
      await PostService.getPostById(this.chosenPostID).then((req) => {
        //console.log('post find')
        //console.log(req)
        this.chosenText = req.text;
        this.chosenTitle = req.title;
        this.chosenUserID = req.userid;
        this.chosenUsername = req.username;
        this.chosenTime = req.createdAt;
      });
      // get user img
      await UserService.searchUserById(this.chosenUserID).then((req) => {
        //console.log(this.chosenUserID)
        //console.log('img find');
        //console.log(req)
        this.chosenUserImg = req.data.img;
      })
    },

    // comments part

    async getAllComments(){
        await CommentService.getCommentsByPostId(this.chosenPostID).then(result=>{
           // update with userservice
           this.comments = result
           for (let index in result) {
                UserService.searchUserById(result[index].userid).then(res=>{
                    this.comments[index].username = res.data.username;
                    this.comments[index].userimg = res.data.img;
                })
           }
            console.log(this.comments)
        })

    },
    async createComments(newComment) {
        await CommentService.insertComment(newComment);
        this.getAllComments();
    },
    async addComment(){
      if(!this.newThreadContent){
        alert('Please input text!');
        return
      }
        let newComment = {"postid": this.chosenPostID, "userid":this.userid, "text": this.newThreadContent}
        console.log(newComment)
        this.createComments(newComment);
        this.newThreadContent = '';
    },
    async deleteCommentsByPostId(id){
        await CommentService.deleteCommentsByPostId(id);
        this.getAllComments();
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

}
</script>

<style scoped>
#createButton:hover {
  background-color: rgba(198, 198, 198, 0.254);
}
#mainpageButton:hover {
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