import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { TripDataService } from './trip-data.service';

@Injectable({
  providedIn: 'root',
})
export class Authentication {
  // Variable to handle authentication responses
  authResp: AuthResponse = new AuthResponse();

  //Setup our storage and service accessor
  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private dataService: TripDataService
  ) { }

  // Get our token from our storage provider
  // NOTE: for this application we have decided we will name
  // The key for our token 'travlr-token' to avoid confusion with any other tokens that may be in storage
  public getToken(): string {
    let out: any;
    out = this.storage.getItem('travlr-token');
    // make sure we return a string even if we dont have a token
    if (!out) {
      return '';
    }
    return out;
  }

  //Save our token to our storage provider
  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  // logout of our application and remove our token from storage
  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  // boolean to determine if we are logged in or not and if token is still valid
  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      const payload = JSON.parse(window.atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  // retreive the current user. this function should only be called
  // after the calling method has been checked to make sure user isLoggedIn
  public getCurrentUser(): User {
    const token: string = this.getToken();
    const { email, name } = JSON.parse(window.atob(token.split('.')[1]));
    return { email, name } as User;
  }

  // login method that leverages the login method in tripDataService 
  // because that method returns an observable we need to subscribe to it and save the token in our response
  public login(user: User, passwd: string): void {
    this.dataService.login(user, passwd)
    .subscribe( {
      next: (value: any) => {
        console.log(value);
        this.authResp = value;
        this.saveToken(this.authResp.token);
      },
      error: (error: any) => {
        console.log('Error: ' + error);
      }
    })
  }

  // register method that leverages the register method in tripDataService
  public register(user: User, passwd: string): void {
    this.dataService.register(user, passwd)
    .subscribe( {
      next: (value: any) => {
        console.log(value);
        this.authResp = value;
        this.saveToken(this.authResp.token);
      },
      error: (error: any) => {
        console.log('Error: ' + error);
      }
    })
  }  
}
