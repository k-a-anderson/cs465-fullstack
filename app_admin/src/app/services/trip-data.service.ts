import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { BROWSER_STORAGE } from '../storage';


@Injectable({
  providedIn: 'root',
})

export class TripDataService {
  private baseUrl = 'http://localhost:3000/api';
  private tripsUrl = this.baseUrl + '/trips';

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  getTrips() : Observable<Trip[]> {
    return this.http.get<Trip[]>(this.tripsUrl);
  }  

  addTrip(formData: Trip) : Observable<Trip> {
    return this.http.post<Trip>(this.tripsUrl, formData);
  }

  getTrip(tripCode: string) : Observable<Trip[]> {
    return this.http.get<Trip[]>(this.tripsUrl + '/' + tripCode);
  }

  updateTrip(formData: Trip) : Observable<Trip> {
    return this.http.put<Trip>(this.tripsUrl   + '/' + formData.code, formData);
  }

  // call to our /login endpoint to get a token for our user
  login(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('login', user, passwd);
  }
  register(user: User, passwd: string) : Observable<AuthResponse> {
  // console.log('Inside TripDataService::register');
    return this.handleAuthAPICall('register', user, passwd);
  }

   // helper method to process both login and register methods
  handleAuthAPICall(endpoint: string, user: User, passwd: string) : Observable<AuthResponse> {
    //console.log('Inside TripDataService::handleAuthAPICall');
    let formData = {
      name: user.name,
      email: user.email,
      password: passwd
    };
    return this.http.post<AuthResponse>(this.baseUrl + '/' + endpoint, formData);
  }
}
