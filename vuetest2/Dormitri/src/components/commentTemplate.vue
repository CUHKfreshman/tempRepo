<!-- the comment page template -->
<!-- it is the whole html structure of the comment page -->
<!-- there are buttons using to jump pages -->
<!-- there are buttons using to use the functionalities see the comments, create comments -->

<template>
<div>
    <div class = "container pull-right md-6" style="background-color: azure;">    
    <h5 id = "add">Add comment:</h5>
    <form class="was-validated">
        <div class="mb-3">
            <label for="new-thread" class="form-label">New Comment</label>
            <textarea class="form-control" v-model="newThreadContent" rows=5 required></textarea>
            <div class="invalid-feedback">Please fill out this field.</div>
        </div>
        <button type="button" class="btn btn-primary col-sm-10 col-md-2 col-xl-5" v-on:click="addComment()">SUBMIT</button>
    </form>
    <br>       
    </div>
    <div class="comments" v-for="(comment, index) in comments" v-bind:item="comment" v-bind:index="index" v-bind:key="comment._id">          
        <div class="flex-shrink-0">
            <img :src="comment.userimg" alt="" class="rounded-circle me-2 border border-2 border-dark align-self-start" width="60" height="60">
        </div>
        <div class="flex-grow-1">
            <h5>{{comment.username}}</h5>
            
            <p>{{comment.text}}</p>
        </div>

        </div>
</div>
</template>

<script>
import CommentService from '../services/CommentService';
import UserService from '../services/UserService';
export default({

    data(){
        return {
          showComment: true,
          comments: [],
          newThreadContent: '',
        }
    },
    props: {
        postid: String, 
        userid: Number
    },
    async created(){
        this.getAllComments();
    },
    methods: {
    async getAllComments(){
        await CommentService.getCommentsByPostId(this.postid).then(result=>{
            //let commenterID = result.userid;
            //let commenter = UserService.searchUserById(commenterID);
        /*    for (let r in result){
                UserService.searchUserById(result[r].userid).then(res=>{
                    let comment = {
                        "createdAt":result[r].createdAt,
                        "userid":result[r].userid,
                        "text":result[r].text,
                        "postid":result[r].postid,
                        "username":res.data.username,
                        "userimg":res.data.img
                    }
                    this.comments.push(comment)
                })
            }
            console.log(this.comments)
            */
           // update with userservice
           this.comments = result
           for (let comment in result) {
                UserService.searchUserById(result[comment].userid).then(res=>{
                    this.comments[comment].username = res.data.username;
                    this.comments[comment].userimg = res.data.img;
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
        // for comments, they are distributed and thus better to directly store img src in comment part.
        let newComment = {"postid": this.postid, "userid":this.userid, "text": this.newThreadContent}
        console.log(newComment)
        this.createComments(newComment);
        this.newThreadContent = '';
    },
    async deleteCommentsByPostId(id){
        await CommentService.deleteCommentsByPostId(id);
        this.getAllComments();
    }
    }
})

</script>
