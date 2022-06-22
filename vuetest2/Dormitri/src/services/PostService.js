// the methods used for implementing annoucement annoucement post funtionalities

import axios from "axios";

const url = 'http://localhost:4000/post';
//access backend by axios
class PostService {

    static async getPosts() {
        const res = await axios.get(`${url}/all`)
        try {
          const data = res.data
          return data
        } catch (err) {
          return err
        }
    }

    static async getPostById(id) {
      const res = await axios.get(`${url}/postid`, {params: {"id": id}});
      try {
        const data = res.data
        console.log(data)
        return data
      } catch (err) {
        return err
      }
    }

    static insertPost(post) {
        return axios.post(`${url}/add`, post)
    }
    static deletePost(id) {
        return axios.delete(`${url}/${id}`)
    }
    static editPost(post, id) {
      return axios.post(`${url}/${id}`, post)
    }
    static async searchPost(text) {
      const res = await axios.get(`${url}/${text}`)
      try {
        const data = res.data
        return data
      } catch (err) {
        return err
      }
    }
}

export default PostService;