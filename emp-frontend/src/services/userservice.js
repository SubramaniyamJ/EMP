import { findHeaderElementFromField } from "@mui/x-data-grid/utils/domUtils";
import axios from "axios";
const API_URL = "http://localhost:8080/api";

class userservice {
  async postUser(user) {
    try {
      const response = await axios.post(API_URL + "/postuser", user);
      return response;
    } catch (error) {
      console.log("There is a error!", error);
      throw error;
    }
  }

  async checkUser(email, password, role) {
    try {
      const response = await axios.get(API_URL + "/checkuser", {
        params: { email, password, role },
      });
      return response;
    } catch (error) {
      console.log("There was an error!", error);
      throw error;
    }
  }
  async manageteachersandstudents(instituteName, role) {
    try {
      const response = await axios.get(API_URL + "/manageteachersandstudents", {
        params: { instituteName, role },
      });
      return response.data;
    } catch (error) {
      console.log("Therre was an error !", error);
      throw error;
    }
  }

  async addTeachers(user) {
    try {
      const response = await axios.post(API_URL + "/admin/addfaculty", user);
      return response.data;
    } catch (error) {
      console.log("add teachers error");
      throw error;
    }
  }

  async addStudents(user){
   try{
     const response= await axios.post(API_URL + "/admin/addStudent",user);
     return response.data;
   }
   catch(error){
     console.log(error);
     throw error;
   }
  }
  async manageTeacher(instituteName) {
    try {
      const response = await axios.get(API_URL + "/admin/managedfaculties", {
        params: {
          instituteName: instituteName,
          instituteName: instituteName,
        },
      });
      return response;
    } catch (error) {
      console.log("Error fetching managed faculties");
      throw error;
    }
  }

   async createdept(dept){
    try{
      console.log(dept);
      const response=await axios.post(API_URL + "/admin/createdepartment",dept)
      return response.data;
    }catch(error){
      console.log(error);
    }
   }
   async getInstitutes(){
    try{
      const response=await axios.get(API_URL + "/institutes");
      return response.data;
    }catch(error){
      console.log(error);
    }
   }
   async existingDepartments(instituteName) {
      try{
        const response=axios.get(API_URL + "/departmentList",{params: {instituteName},});
        return response;
      }catch(error){
        throw error;
      }
   }
   async verifyUser(user,instituteName) {
    try{
      const response=await axios.post(API_URL + "/admin/verifystatus",user,{params: {instituteName},});
      return response.data;
    }catch(error){
      throw error;
    }
   }
}

export default new userservice();
