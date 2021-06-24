import { HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable, of, throwError } from 'rxjs';

import { Credentials } from '../models/credentials.model';
import { Users } from '../models/users';
import { Patient } from '../models/patient';
import { Appointment } from '../models/appointment';
import { LoginResponse } from '../models/loginResponse';

import { ApiService } from './api.service';
import { tap } from 'rxjs/operators';


import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable()
export class DataService {

  userId : string;
  loginResp = new LoginResponse;
  isLoggedIn = false;
  isLogIn: BehaviorSubject<boolean>;

  constructor(private api: ApiService) {
    this.isLogIn = new BehaviorSubject<boolean>(false);
  }

  authenticateUser(user_name: string, password: string): Observable<boolean> {
    // store 'id' from response as key name 'id' to the localstorage
    // store 'token' from response as key name 'token' to the localstorage

    // return true if user authenticated

    // return false if user not authenticated
    try {
    const response = this.api.checkLogin(user_name, password);
    return response.subscribe(res => {
      if (res) {
        localStorage.setItem('id', res.id);
        localStorage.setItem('token', res.token);
        this.loginResp.id = res.id;
        this.loginResp.message = res.message;
        this.loginResp.success = res.success;
        this.loginResp.token = res.token;
        this.userId = res.id;
        this.isLoggedIn = true;
        return of(true);
      } else {
        this.isLoggedIn = false;
        return of(false);
      }
    });

    } catch(error) {
      this.handleError(error);
    }
  }

  getAuthStatus(): Observable<boolean> {
    // return true/false as a auth status
    const result = this.userId && this.isLoggedIn;
    return of(result);
  }

  regNewUser(regNewUser): Observable<any> {
    // should return response retrieved from ApiService

    // handle er
    try{
      return this.api.regNewUser(regNewUser);
    } catch(error) {
      this.handleError(error);
    }
  }

  doLogOut() {
    // You should remove the key 'id', 'token' if exists
    const key = localStorage.getItem('id'); 
    const token = localStorage.getItem('token');
    if ( key && token ) {
      localStorage.removeItem('id');
      localStorage.removeItem('token');
      this.isLoggedIn = false;
      this.userId = undefined;
    }
  }

  getUserDetails(): Observable<any> {
    // should return user details retrieved from api service
    try{
      return this.api.getUserDetails(this.userId);
    } catch(error) {
      this.handleError(error);
    }
  }

  updateProfile(userId:string, userDetails): Observable<boolean> {
    // should return response retrieved from ApiService

    // handle error
    try{
      return this.api.updateDetails(userId, userDetails).subscribe(res=>{
          return of(res);
      }); 
    } catch(error) {
      this.handleError(error);
    }
  }

  registerPatient(patientDetails): Observable<any> {
    // should return response retrieved from ApiService

    // handle error
    try{
      return this.api.registerPatient(patientDetails);
    } catch(error) {
      this.handleError(error);
    }
  }

  getAllPatientsList(): Observable<any> {
    // should return all patients from server

    // handle error
    try{
      return this.api.getAllPatientsList();
    } catch(error) {
      this.handleError(error);
    }
  }

  getParticularPatient(id): Observable<any> {
    // should return particular patient details from server

    // handle error
    
    try {
      return this.api.getParticularPatient(id);
    }catch(error) {
      this.handleError(error);
    }
  }
  
  diseasesList(): Observable<any> {
    // should return diseases from server

    // handle error
    try{
      return this.api.diseasesList();
    } catch(error) {
      this.handleError(error);
    }
     
  }

  scheduleAppointment(appointmentDetails): Observable<any> {
    // should return response from server if appointment booked successfully

    // handle error 
    try{
      return this.api.scheduleAppointment(appointmentDetails);
    }catch(error) {
      this.handleError(error);
    }
  }

  getSinglePatientAppointments(patientId): Observable<any> {
    // should return appointments of particular patient from server

    // handle error
    try{
      return this.api.getSinglePatientAppointments(patientId);
    } catch(error) {
      this.handleError(error);
    }
  }

  deleteAppointment(appointmentId): Observable<any> {
    // should delete the appointment

    // handle error
    try{
      return this.api.deleteAppointment(appointmentId);
    }catch(error) {
      this.handleError(error);
    }
  }

  requestedAppointments(): Observable<any> {
    // should return all requested appointments from server

    // handle error
    try{
      return this.api.requestedAppointments();
    }catch(error) {
      this.handleError(error);
    }
  }

  private handleError(error: HttpErrorResponse) {
    // handle error here
    console.log("Error occured while fetching Data", error);
  }


}

