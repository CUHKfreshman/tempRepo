// the methods used for implementing user funtionalities

import axios from "axios";

const url = 'http://localhost:4000/user';
//access backend by axios
class UserService {
  static async addUser(user){
    console.log(user);
    return axios.post(`${url}/add`, user);
  }

  static async getUsers(){
    return axios.get(`${url}/all`);
  }

  static async addTempUser(user) {
    console.log(user);
    return axios.post(`${url}/addtemp`, user);
  }

  static async updateUserPasswordByAdmin(user) {
    console.log("Update User password");
    console.log(user);
    return axios.post(`${url}/updatepasswordbyadmin`, user);
  }

  static async checkTempUser(user) {
    console.log(user);
    return axios.post(`${url}/checktemp`, user);
  }

  static async searchUser(user){
    console.log(user);
    return axios.get(`${url}/search`, {params: {"_id": user._id, "password": user.password}});
    }

  static async searchUserById(userid){
    console.log("search userid: " + userid);
    return axios.get(`${url}/searchid`, {params: {"_id": userid}});
  }

  //warden service
  static async searchUserEmail(){
      return axios.get(`${url}/searchemail`, {params: {"identity": 'admin'}});
  }

  static async updateUserPassword(user){
    return axios.post(`${url}/updatepassword`, user);
  }

  // currently includes, update college, hostel, room, userStatus
  static async updateUserProfile(user){
    return axios.post(`${url}/updateprofile`, user);
  }

  // currently includes, update college, hostel, room, userStatus
  static async updateAllInfo(user){
    return axios.post(`${url}/updateall`, user);
  }

  static async updateUserPhoto(user){
    return axios.post(`${url}/updatephoto`, user);
  }

  static async changeOnlineStatus(user){
    return axios.post(`${url}/changeOnlineStatus`, user);
  }
  static async changeOfflineStatus(user){
    return axios.post(`${url}/changeOfflineStatus`, user);
  }
}

export default UserService;
