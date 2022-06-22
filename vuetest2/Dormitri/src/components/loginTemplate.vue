<!-- the login in front end template -->
<!-- it is the whole html structure of login front end -->
<!-- there are buttons using to register an account -->
<!-- there are buttons using to login for normal user and admin-->

<template>
  <div class="container-fluid text-center d-flex flex-sm-nowrap align-items-center justify-content-center bg-light">

    <div class="card border-5 py-3 px-5 align-items-center justify-content-center " style="height: 70%; width:34.17%" v-if="!isMobile">
    
      <img class="position-absolute  start-50 translate-middle" src="../assets/logo.svg" alt="" width="140" height="140" style="top: 1rem;" >
      <form @submit="onRegPreSubmit" class="mt-1" id="register-entry" v-if="showReg">
        <h2 class="fw-normal mb-3">Create an Account</h2>

        <div class="form-floating">
            <input type="text" class="form-control" id="floatingUsername" v-model="username"  placeholder="Username">
            <label for="floatingUsername">Username</label>
        </div>
            <div class="form-floating">
              <input type="password" class="form-control" id="floatingPassword"  v-model="password" placeholder="Password">
              <label for="floatingPassword">Password</label>
          </div>

        <div class="form-floating">
            <input type="email" class="form-control" id="floatingInput" v-model="email"  placeholder="name@example.com">
            <label for="floatingInput">Email address</label>
        </div>
          <button class="btn btn-primary btn-lg mt-3 w-100" type="submit" >Sign up</button>
          <hr>
          <p class="mt-3 mb-1"> Already have an account? Sign in <button class="btn btn-outline-dark mb-1" type="button" v-on:click="changeForm()">here</button></p>
          
      </form>
            <form @submit="onCodeSubmit" class="register-form" id="register-entry" v-if="showVerify">
              <h2 class="fw-normal mb-3">Email Verification</h2>


        <div class="form-floating">
            <input type="text" class="form-control" id="floatingCode" v-model="verification_code" placeholder="Verification Code"/>
            <label for="floatingCode">Verification Code</label>
        </div>
                <button class="btn btn-lg btn-primary w-100 mt-3" type="submit">Confirm</button>
            </form>

      <form @submit="onLogSubmit" class="login-form" v-if="showLog">
        <h2 class="fw-normal mb-3">Sign in to Your Account</h2>


        <div class="form-floating">
            <input type="text" class="form-control" id="floatingID" v-model="_id"  placeholder="User ID">
            <label for="floatingID">User ID</label>
        </div>

            <div class="form-floating">
              <input type="password" class="form-control" id="floatingSigninPassword"  v-model="password" placeholder="Password">
              <label for="floatingSigninPassword">Password</label>
          </div>
          <button class="btn btn-lg btn-primary w-100 mt-3" type="submit" >Sign in</button>
          <hr>
          <p class="mt-3 mb-1"> Doesn't have an account? Sign up <button class="btn btn-outline-dark mb-1" type="button" v-on:click="changeForm()">here</button></p>
      </form>
      </div>
    <div class="card border-5 py-3 px-5 align-items-center justify-content-center " style="height: 76%; width:94.17%" v-if="isMobile">
    
      <img class="position-absolute  start-50 translate-middle" src="../assets/logo.svg" alt="" width="140" height="140" style="top: 0.1rem;" >
      <form @submit="onRegPreSubmit" class="mt-1" id="register-entry" v-if="showReg">
        <h2 class="fw-normal mb-3 mt-5">Create an Account</h2>

        <div class="form-floating">
            <input type="text" class="form-control" id="floatingUsername" v-model="username"  placeholder="Username">
            <label for="floatingUsername">Username</label>
        </div>
            <div class="form-floating">
              <input type="password" class="form-control" id="floatingPassword"  v-model="password" placeholder="Password">
              <label for="floatingPassword">Password</label>
          </div>

        <div class="form-floating">
            <input type="email" class="form-control" id="floatingInput" v-model="email"  placeholder="name@example.com">
            <label for="floatingInput">Email address</label>
        </div>
          <button class="btn btn-primary btn-lg mt-3 w-100" type="submit" >Sign up</button>
          <hr>
          <p class="mt-3 mb-1"> Already have an account?<br/> Sign in  <button class="btn btn-outline-dark mb-1" type="button" v-on:click="changeForm()">here</button></p>
          
      </form>
            <form @submit="onCodeSubmit" class="register-form" id="register-entry" v-if="showVerify">
              <h2 class="fw-normal mb-3">Email Verification</h2>


        <div class="form-floating">
            <input type="text" class="form-control" id="floatingCode" v-model="verification_code" placeholder="Verification Code"/>
            <label for="floatingCode">Verification Code</label>
        </div>
                <button class="btn btn-lg btn-primary w-100 mt-3" type="submit">Confirm</button>
            </form>

      <form @submit="onLogSubmit" class="login-form" v-if="showLog">
        <h2 class="fw-normal mb-3">Sign in to Your Account</h2>


        <div class="form-floating">
            <input type="text" class="form-control" id="floatingID" v-model="_id"  placeholder="User ID">
            <label for="floatingID">User ID</label>
        </div>

            <div class="form-floating">
              <input type="password" class="form-control" id="floatingSigninPassword"  v-model="password" placeholder="Password">
              <label for="floatingSigninPassword">Password</label>
          </div>
          <button class="btn btn-lg btn-primary w-100 mt-3" type="submit" >Sign in</button>
          <hr>
          <p class="mt-3 mb-1"> Doesn't have an account? <br/> Sign up <button class="btn btn-outline-dark mb-1" type="button" v-on:click="changeForm()">here</button></p>
      </form>
      </div>
  </div>


</template>

<script>
import UserService from "../services/UserService";
export default {
  name: "LoginTemplate",
  data() {
    return {
      username: "",
      password: "",
      email: "",
      verification_code: '',
      showReg: true,
      showLog: false,
      showVerify: false,
      _id: null
    };
  },
  computed: {

    isMobile: ()=>{
      return ((window.innerWidth <= 900) && (window.innerHeight <= 1200));
    },
  },
  emits: ["new-user", "old-user"],
  methods: {
    validateEmail(mail) {
     //for any email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      let validMailFormat = /^\d{10}@link.cuhk.edu.hk+$/;
      if (validMailFormat.test(mail)) {
        return (true)
      }
      return (false)
    },
    onRegSubmit() {
      const newUser = {
        _id: parseInt(this.email.slice(0,10)),
        username: this.username,
        password: this.password,
        email: this.email,
      };

      const checkUser = {
          id: parseInt(this.email.slice(0,10)),
          username: this.username,
          password: this.password,
          email: this.email,
          code: this.verification_code
      };

      if (! this.check_state){
        UserService.checkTempUser(checkUser).then(resp=>
        {
          if(resp.status == 205) {
            console.log("check temp user failed");
            alert("Invalid code, please check again.");
            this.verification_code = "";
          } else { 
            this.check_state = true; 
            if (this.check_state){
              
              let fullUser = newUser;
              fullUser.img = "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png";
              console.log(fullUser);
              this.$emit("new-user", fullUser);
              console.log("emit user");
              this.username = "";
              this.password = "";
              this.email = "";
              this.verification_code = "";
              this.check_state = false;
              this.showVerify = !this.showVerify;
              this.showReg = !this.showReg;
            }
          }
        })
      }
    },
    onRegPreSubmit(e) {
      e.preventDefault();
      if (!this.username) {
        alert("Please enter a username!");
        return;
      } else if (!this.email) {
        alert("Please enter an email address!");
        return;
      } else if (!this.password) {
        alert("Please enter a password!");
        return;
      } 
      if (!this.validateEmail(this.email)) {
        alert("Please enter a valid email address!");
      }
      else {
        this.showVerify = !this.showVerify;
        this.showReg = !this.showReg;
        const newUser = {
          id: parseInt(this.email.slice(0,10)),
          username: this.username,
          password: this.password,
          email: this.email,
        };
        UserService.addTempUser(newUser);
      }
    },
    onLogSubmit(e) {
      e.preventDefault();
      if (!this._id||this._id.length!=10||parseInt(this._id)==NaN) {
        alert("Please enter a valid SID!");
        return;
      } else if (!this.password) {
        alert("Please enter a password!");
        return;
      }

      const oldUser = {
        _id: parseInt(this._id),
        password: this.password,
      };
      console.log(oldUser);
      this.$emit("old-user", oldUser);
      this._id = null;
      this.password = "";
    },
    changeForm() {
      this.showLog = !this.showLog;
      this.showReg = !this.showReg;
    },
    onCodeSubmit(e) {
      e.preventDefault();
      if (!this.verification_code){
        alert("Please enter the verification code!");
      } else {
        this.onRegSubmit();
      }
    }
  },
};
</script>

<style scoped>

</style>
