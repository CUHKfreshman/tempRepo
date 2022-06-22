// the methods used for implementing comment funtionalities

import axios from "axios";

const url = 'http://localhost:4000/comment';
//access backend by axios
class CommentService {
    static async getCommentsByPostId(id) {
      const res = await axios.get(`${url}/postid`, {params: {"id": id}});
      try {
        const data = res.data
        console.log(data)
        return data
      } catch (err) {
        return err
      }
    }

    static insertComment(comment) {
        var createdAt = new Date();
        return axios.post(`${url}/add`, {...comment, "createdAt": createdAt})
    }

    static deleteCommentsByPostId(id){
        return axios.delete(`${url}/${id}`)
    }

}

export default CommentService;