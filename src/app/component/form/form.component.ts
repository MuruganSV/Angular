import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Patient } from '../../models/patient';
import { DataService } from '../../services/data.service';
// import { CustomValidatorService } from '../../services/customvalidator.service';
import { NgForm } from '@angular/forms';
// import * as alertify from 'alertify.js';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [DatePipe]
})
export class FormComponent implements OnInit {

  complexForm: FormGroup;
  patientDetails = new Patient;
  result;

  today: string;

  noRecordsFound = 'No patient records found in the list. Click on Register New Patient to add Patient details.';

  emptyName = 'You must include a name.';
  minlengthName = 'Your name must be at least 3 characters long.';
  maxlengthName = 'Your name cannot exceed 20 characters.';
  noGender = 'You must select a gender.';
  noDob = 'You must select a valid date of birth.';
  noMobile = 'You must include mobile number.';
  numberMobile = 'You must enter a valid 10 digit mobile number.';
  maxlengthMobile = 'Your mobile number should not exceed 10 digits.';
  patternEmail = 'You must enter a valid Email ID.';

  ngOnInit() {
    this.today = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
  }

  constructor( fb: FormBuilder,private datePipe: DatePipe,private route: Router, 
    private dataService: DataService,
    // private customValidator: CustomValidatorService,
  ){
    // add necessary validators
    this.complexForm = fb.group({
      name : new FormControl('',[
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
    ]),
      gender : new FormControl(null, [Validators.required]),
      dob : new FormControl(null, [Validators.required]),
      mobile : new FormControl('',[Validators.required, Validators.pattern('[0-9 ]{10}')]),
      email : new FormControl('',[Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
    }
  );
  }

  get registerFormControls() {
    return this.complexForm.controls;
}

  submitForm(value: any){

    // should reister new patient using service
       // fields that need to be added: patient_name, patient_gender, patient_dob, patient_mobile, patient_email
    // if added successfully should redirect to 'patientList' page
    if(value.invalid) {
      return;
    }

    this.patientDetails.patient_name = this.complexForm.get('name').value;
    this.patientDetails.patient_gender = this.complexForm.get('gender').value;
    this.patientDetails.patient_dob = this.complexForm.get('dob').value;
    this.patientDetails.patient_mobile = this.complexForm.get('mobile').value;
    this.patientDetails.patient_email = this.complexForm.get('email').value;
    this.dataService.registerPatient(this.patientDetails).subscribe(res=>{
      if(res.message=="Booking successfull") {
        this.route.navigateByUrl('/patientList');
      }
    });
  }

}
