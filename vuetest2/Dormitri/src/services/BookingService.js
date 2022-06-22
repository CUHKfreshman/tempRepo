// the methods used for implementing booking funtionalities

import axios from "axios";

const url = 'http://localhost:4000/booking';
//access backend by axios

class BookingService {    
    static async searchFacility(que){
        //console.log("search query is ");
        //console.log(query)
        const res = await axios.get(url,que)
        try{
            const data = res.data
            return data.map(post => ({
              ...post
            }))
          } catch (error) {
            return error
          }
    }
    static async searchBooking(que) {

        const res = await axios.get(`${url}/list`,{params: {"hookID": que.hookID}})
        try {
          const data = res.data
          return data
        } catch (err) {
          return err
        }
      }
    //static cancelBooking(fName, fID, time){
    static cancelBooking(que){
            //return axios.delete(`${url}${id}`);
            //not enough
            //need to check status in database 
            //check cancel is valid or invalid request
            //to add
        return axios.delete(url, que)
    }

    static createBooking(query){
        return axios.post(`${url}/add`, query)
    }
}
export default BookingService;
