<template>
  <socketAdminTemplate v-if="isAdmin"/>
  <socketStudentTemplate v-if="!isAdmin"/>
</template>

<script>

import socketAdminTemplate from '../components/socketAdminTemplate.vue';
import socketStudentTemplate from '../components/socketStudentTemplate.vue'
export default {
  name: 'Contact',
  data(){
    return {
      isAdmin: false
    }
  },
  components: {
    socketAdminTemplate,
    socketStudentTemplate
  },
  created() {
    //check user identity to return different template
    var identity = JSON.parse(sessionStorage.getItem('isLogin'))['identity'];
    //console.log(this.isAdmin)
    if(identity == 'admin') {
      this.isAdmin = true
    }
    else {
      this.isAdmin = false
    }
  },
  methods: {
  }
}
</script>