<script>
import LoginTemplate from '../components/loginTemplate.vue';
import UserService from '../services/UserService';
import {store} from '../store/index';
export default {
  name: 'Login',
  components: {
    LoginTemplate,
  },
  async beforeCreate() {
    // Clear Login Status in local storage
    sessionStorage.clear();
  },
  methods:{
    async addUser(user){
      UserService.addUser(user).then(resp=>
        {
          if(resp.status == 205) {
            alert("Invalid information, please check again.");
          }
          else {
            alert("Registered Successfully! Remember to use SID to login.");
          }
        }
      )
    },
    
    async searchUser(user){
      UserService.searchUser(user).then(resp =>
      {
        console.log('resp.data')
        console.log(resp.data[0])
        if(resp.data.length>0)
        {
          //Store current user information in local storage
          var storeInfo = resp.data[0];
          //change status for local storage
          storeInfo['userStatus'] = 'Online';
          //delete password storage in case leaking
          delete storeInfo['password'];
          sessionStorage.setItem("isLogin", JSON.stringify(storeInfo));
          store.commit('setMyInfo', storeInfo);
          //change status in mongodb
          UserService.changeOnlineStatus(user);
          this.$router.push({path:`/home`});
        }
        else
        {
          alert("Invalid account, please check again.");
        }
      }
      )
    }
  }
}
</script>

<template>

      <LoginTemplate @new-user="addUser" @old-user="searchUser"/>

<!--    <div class="router_panel">
      <router-link to="/home"><h1>router home</h1></router-link>
    </div>
-->
</template>

<style scoped>

</style>
