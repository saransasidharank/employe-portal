import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserSchema } from '../Models/usersSchema';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  SERVER_URL="https://employee-portal-server-1qmi.onrender.com"
  constructor(private http:HttpClient) { }

  addUserAPI(user:UserSchema){
    return this.http.post(`${this.SERVER_URL}/users`,user)
  }

  getAllUserAPI(){
    return this.http.get(`${this.SERVER_URL}/users`)
  }

  getSingleUserAPI(id:string){
    return this.http.get(`${this.SERVER_URL}/users/${id}`)
  }

  updateUserAPI(userId:string,userDetails:UserSchema){
    return this.http.put(`${this.SERVER_URL}/users/${userId}`,userDetails)
  }

  removeUserAPI(userId:string){
    return this.http.delete(`${this.SERVER_URL}/users/${userId}`)
  }
}