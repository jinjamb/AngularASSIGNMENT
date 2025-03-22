import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn: boolean | undefined;

  logIn() {
    this.loggedIn = true;
  }

  logOut() {
    this.loggedIn = false;
  }

  setAdmin(isAdmin: boolean) {
    this.loggedIn = isAdmin;
  }

  isAdmin() {
    const isUserAdmin = new Promise(
      (resolve, reject) => {
          resolve(this.loggedIn);
        });
    return isUserAdmin;
  }
}
