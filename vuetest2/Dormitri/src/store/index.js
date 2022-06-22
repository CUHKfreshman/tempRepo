import { createStore } from "vuex";
import createPersistedState from 'vuex-persistedstate'
export const store = createStore({
    state: {
        /* login status */
        isLogin:false,
        /* logged user information */
        myInfo:{
            img:'http://img.52z.com/upload/news/image/20180111/20180111085521_86389.jpg',
            _id: Number,
            email: '',
            identity: '',
            username: '',
            college: '',
            hostel: '',
            userStatus: '',
            room: ''
        },
        /* receiver information*/
        receiverInfo:{
            img:'http://img.52z.com/upload/news/image/20180111/20180111085521_86389.jpg',
            _id: Number,
            email: '',
            identity: '',
            username: '',
            college: '',
            hostel: '',
            userStatus: '',
            room: ''
        },
        /* user list for admin to read*/
        userList:[],
        /*admin list for normal user to read */
        adminList:[],
        // chat message
        chatMessageList:[],
    },
    mutations: {
        // update message list
        SOCKET_updateChatMessageList(state,data){
            console.log(`received message:`);
            console.log(data);
            state.chatMessageList.push(data);
        },
        // update user list
        SOCKET_userLogin(state,data){
            // prevent non-admin get information for privacy
            if(state.myInfo.identity=="admin"){
                console.log('vuex received data from user login, saved changes.');
                state.userList=data;
            }
        },
        // update admin list
        SOCKET_adminLogin(state,data){
            //for users to get online admin list
            if(state.myInfo.identity!="admin"){
                console.log('vuex received data from admin login, saved changes.');
                state.adminList=data;
            }
        },
        setReceiverInfo(state,data){
            state.receiverInfo=data;
        },
        setMyInfo(state,data){
            //console.log("vuex received")
            state.myInfo=data;
            state.isLogin=true;
        }
    },
    //store in sessionStorage, clear data when close browser
    plugins: [createPersistedState({storage: window.sessionStorage})]
})