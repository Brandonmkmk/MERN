import axios from "axios";

/*Esto indica que la cookie se establezca en baseUrl*/
const instance= axios.create({
    baseURL:'http://localhost:3000/api',
    withCredentials:true
})

export default instance