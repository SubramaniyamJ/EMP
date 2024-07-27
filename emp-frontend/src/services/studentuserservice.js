import axios from 'axios'
const API_URL = "http://localhost:8080/api"

class Studentuserservice {
    async poststudentuser(user){
        await axios.post(API_URL + "/poststudentuser", user)
    }

    // async checkstudentlogin(email, password){
    //     const response = await axios.get(API_URL + "/checkstudentlogin",{
    //         params: {
    //             email: email,
    //             password: password
    //         }
    //     })
    //     return response.data;
    // }
    async checkstudentlogin(email, password) {
        try {
            const response = await axios.get(API_URL + "/checkstudentlogin", {
                params: { email, password }
            });
            return response.data;  // Assuming you want to return the response data
        } catch (error) {
            console.error("There was an error!", error);
            throw error;
        }
    }
}

export default new Studentuserservice();