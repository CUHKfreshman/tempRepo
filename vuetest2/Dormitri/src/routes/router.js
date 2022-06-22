// the router and its used modules and APIs
// and define the paths

import { createWebHistory, createRouter } from "vue-router";
import Announcement from "../views/Announcement.vue";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import Contact from "../views/Contact.vue";
import Profile from "../views/Profile.vue";
import Booking from '../views/Booking.vue';
import Forum from "../views/Forum.vue";
// router for multi-page application
const routes = [
  {
    path: "/announcement",
    name: "Announcement",
    component: Announcement,
    meta: {
        keepAlive: false,
        requireAuth: true
    }
  },
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: {
        keepAlive: false
    }
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
        keepAlive: false,
        requireAuth: true
    }
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
    meta: {
        keepAlive: false,
        requireAuth: true
    }
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
        keepAlive: false,
        requireAuth: true
    }
  },
  {
    path: "/booking",
    name: "Booking",
    component: Booking,
    meta: {
        keepAlive: false,
        requireAuth: true
    }

  },
  {
    path: "/forum",
    name: "Forum",
    component: Forum,
    meta: {
        keepAlive: false,
        requireAuth: true
    }
  },
  /*,
  {
    path: "/bookStatus",
    name: "bookStatus",
    component: bookStatus,
    meta: {
        keepAlive: false,
        requireAuth: true
    }
  },*/
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to,from,next)=>{
  if(to.meta.requireAuth) {
    if(sessionStorage.getItem('isLogin')) {
      next();
    }
    else {
      next({path: '/'});
    }
  } else {
    next();
  }
})
export default router;
