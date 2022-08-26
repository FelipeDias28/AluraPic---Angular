import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NewUSer } from "./new-user";

const API_URL = "http://localhost:3000";

@Injectable({ providedIn: "root" })
export class SignupService {
  constructor(private http: HttpClient) {}

  checkUserNameTaken(userName: string) {
    return this.http.get(API_URL + "/user/exists/" + userName);
  }

  signup(newUser: NewUSer) {
    return this.http.post(API_URL + "/user/signup", newUser);
  }
}
