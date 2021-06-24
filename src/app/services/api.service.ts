import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable , of, throwError} from 'rxjs';

import { Credentials } from '../models/credentials.model';
import { Users } from '../models/users';
import { Patient } from '../models/patient';
import { Appointment } from '../models/appointment';
import { tap } from 'rxjs/operators';

@Injectable()
export class ApiService {

  API_URL: String;
  BASE_URL: String;

  constructor(private http: HttpClient) {
    
    this.API_URL = 'api';

  }

  public checkLogin(user_name: string, password: string): Observable<any> {
    // should return response from server

    // handle error
    const payload = {
      user_name,
      password,
    };
    const URL = this.API_URL + '/signin';
    try {
      return this.http.post(URL, payload);
    } catch(error) {
       this.handleError(error);
    }
  }

  public regNewUser(regNewUser): Observable<any> {
    // should return response from server

    // handle error
    const payLoad = {
      regNewUser,
    };

    const URL = this.API_URL + '/register';
    try {
      return this.http.post(URL, payLoad);
    } catch(error) {
      this.handleError(error);
    }

  }

  public getUserDetails(userId: string): Observable<any> {
    // should return user details retireved from server

    // handle error 
    const URL = this.API_URL + '/viewprofile/'+userId;
    try {
      return this.http.get(URL);
    } catch(error) {
      this.handleError(error);
    }
  }

  public updateDetails(userId:string, userDetails: any): Observable<any> {
    // should return response from server

    // handle error
    const URL = this.API_URL + '/editprofile/'+userId;
    const payload ={
      userDetails,
    }
    try{
      return this.http.post(URL, payload);
    } catch(error) {
      this.handleError(error);
    }
  }

  public registerPatient(patient: any): Observable<any> {
    // should return response from server if patientDetails added successfully

    // handle error
    const URL = this.API_URL + '/patients/register';
    const payload = {
      patient,
    };

    try {
      return this.http.post(URL, payload);
    }catch(error) {
      this.handleError(error);
    }
  }

  public getAllPatientsList(): Observable<any> {
    // should return all patients from server

    // handle error
    const URL = this.API_URL + '/patients/list';
    try {
      return this.http.get(URL);
    }catch(error) {
      this.handleError(error);
    }
  }

  public getParticularPatient(patientId): Observable<any> {
    // should return particular patient details from server

    // handle error 
    const URL = this.API_URL + '/patients/view/'+patientId;
    try {
      return this.http.get(URL);
    } catch(error){
      this.handleError(error);
    }
  }


  //this endpoint not available
  public diseasesList(): Observable<any> {
    // should return diseases from server

    // handle error 
    const URL = this.API_URL + '/disease/list';
    try{
      return this.http.get(URL);
    }catch(error) {
      this.handleError(error);
    }
      
  }

  public scheduleAppointment(appointmentDetails: any) : Observable<any>{
    // should return response from server if appointment booked successfully

    // handle error
    const URL = this.API_URL + '/appointment/register';
    const payload = {
      appointmentDetails
    };
    try{
      return this.http.post(URL, payload);
    }catch(error){
      this.handleError(error);
    }
  }

  public getSinglePatientAppointments(patientId): Observable<any> {
    // should return appointments of particular patient from server

    // handle error 
    const URL = this.API_URL + '/patients/view/' + patientId;
    try {
      return this.http.get(URL);
    }catch(error){
      this.handleError(error);
    }
  }

  public deleteAppointment(appointmentId): Observable<any>  {
    // should delete the appointment

    // handle error
    const URL = this.API_URL + '/appointment/delete/'+ appointmentId;
    try {
      return this.http.delete(URL);
    }catch (error) {
      this.handleError(error);
    }
  }

  public requestedAppointments(): Observable<any> {
    // should return all requested appointments from server

    // handle error 
    const URL = this.API_URL + '/appointment/list';
    try {
      return this.http.get(URL);
    } catch(error) {
      this.handleError(error);
    }
    return;
  }


  private handleError(error: HttpErrorResponse) {
    // handle error here
    console.log("Error occured during API call", error);
  }

}
