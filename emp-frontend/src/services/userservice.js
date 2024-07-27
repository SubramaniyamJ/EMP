import axios from 'axios'
const API_URL = "http://localhost:8080/api"

class userservice {
    async postUser(user){
        await axios.post(API_URL + "/postuser", user)
    }

    async checkUser(email, password, role) {
        try {
            const response = await axios.get(API_URL + "/checkuser", {
                params: { email, password, role }
            });
            return response;
        } catch (error) {
            console.log("There was an error!", error);
            throw error;
        }
    }

    
}

export default new userservice();