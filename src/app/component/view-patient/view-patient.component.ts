import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Appointment } from '../../models/appointment';
// import * as alertify from 'alertify.js';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.css'],
  providers: [DatePipe]
})
export class ViewPatientComponent implements OnInit {

  patient;
  listOfDiseases;
  today;
  isBookAppointment: boolean = true;
  isFormEnabled: boolean = false;
  isScheduledAppointment: boolean = true;
  isTableEnabled: boolean = false;
  appointmentForm: FormGroup;
  appointmentDetails = new Appointment;
  bookedAppointmentResponse;
  ScheduledAppointmentResponse;
  patientId: any;

  constructor(@Inject(ActivatedRoute) private activatedRoute : ActivatedRoute, fb: FormBuilder,private route: Router, private datePipe: DatePipe, private dataService: DataService) {
    this.today = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
    

    // add necessary validators

    this.appointmentForm = fb.group({
      'selectDisease' : [null, Validators.required],
      'tentativeDate' : [null, Validators.required],
      'priority' : [null, Validators.required]
    })
   }

  ngOnInit() {
    this.patientId = this.activatedRoute.snapshot.params['id'];
    // get selected patient id
    this.dataService.getParticularPatient(this.patientId).subscribe(res=>{
      this.patient = res;
    });
    // get Particular Patient from service using patient id and assign response to patient property

  }

  bookAppointment() {
    this.dataService.diseasesList().subscribe(res=>{
      if(res) {
        this.listOfDiseases = res;
        this.isFormEnabled = true;
        this.isBookAppointment = false;
        this.isTableEnabled = false;
      }
    });
    // get diseases list from service
    

    // change isBookAppointment, isScheduledAppointment, isFormEnabled, isTableEnabled property values appropriately
  }

  scheduleAppointment() {
    // The below attributes to be added while booking appointment using service
    // patientId, disease, priority, tentativedate
    this.appointmentDetails.patientId = this.patientId;
    this.appointmentDetails.priority = this.appointmentForm.get('priority').value;
    this.appointmentDetails.disease = this.appointmentForm.get('selectDisease').value;
    this.appointmentDetails.tentativeDate = this.appointmentForm.get('tentativeDate').value;

    this.dataService.scheduleAppointment(this.appointmentDetails).subscribe(res=>{
      if(res) {
        this.bookedAppointmentResponse = res;
        this.route.navigateByUrl('/requested_appointments');
      }
    });
    // if booked successfully should redirect to 'requested_appointments' page
    
  }

  scheduledAppointment() {
    
    // change isBookAppointment, isScheduledAppointment, isFormEnabled, isTableEnabled property values appropriately
    this.dataService.getSinglePatientAppointments(this.patientId).subscribe(res=>{
      if(res) {
        this.ScheduledAppointmentResponse = res;
        this.isFormEnabled = false;
        this.isTableEnabled = true;
        this.isBookAppointment = false;
      }
    });
    // get particular patient appointments using getSinglePatientAppointments method of DataService
  }

  get appointmentFormControls () {
    return this.appointmentForm.controls;
  } 

  cancelAppointment(appointmentId) {
    // delete selected appointment uing service
    if (this.dataService.deleteAppointment(appointmentId)) {
      this.dataService.getSinglePatientAppointments(this.patientId).subscribe(res=>{
        if(res) {
          this.ScheduledAppointmentResponse = res;
        }
      });
    }
    // After deleting the appointment, get particular patient appointments
  }
  
}
