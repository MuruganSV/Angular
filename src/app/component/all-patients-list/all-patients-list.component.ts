import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from '../../models/patient';
import { DataService } from '../../services/data.service';
import {ActivatedRoute, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-all-patients-list',
  templateUrl: './all-patients-list.component.html',
  styleUrls: ['./all-patients-list.component.css']
})
export class AllPatientsListComponent implements OnInit {

  allPatients;

  constructor(private route: Router, private dataService: DataService) { }

  ngOnInit() {

    // get all patients list from service
    this.dataService.getAllPatientsList().subscribe(res=>{
      if(res){
        this.allPatients = res;
      }
    });

  }

  view(patientId) {

    // should navigate to 'patientList' page with selected patientId
    const url = '/patientList/' + patientId;
    this.route.navigateByUrl(url);
    
  }
  
}
