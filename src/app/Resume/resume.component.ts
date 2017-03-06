import { Component, Input, OnInit, OnDestroy, DoCheck, SimpleChange, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormControl,  NgForm, NgModel, FormsModule, ReactiveFormsModule,
	FormGroup, 
	FormBuilder } from '@angular/forms'; 
import { ResumeService } from '../Services/resume.service';
import { SearchService } from '../Services/search.service';
import { Resume } from './classes/resume';
import { Position } from './classes/position'
import { User } from './classes/user.interface';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/Rx';

@Component({
	selector: 're-resume',
	templateUrl: './resume.component.html',
	styleUrls: ['../app.component.css']
})

export class ResumeComponent implements OnInit, OnDestroy, DoCheck {

  @Output()
  select: EventEmitter<any>;
  
  name: string = "";
  private sub: any;
  
  constructor(private searchService:SearchService, private resumeService:ResumeService, private route: ActivatedRoute) {
		this.select = new EventEmitter();
	}
	
	// Start process of pulling in resume json file
	// Note: If app pulls in a partner component, this does nothing
  ngOnInit() {
    console.log("Hello");
    this.sub = this.route.params.subscribe(params => {
      this.name = params['name']; // (+) converts string 'id' to a number
    });
    this.resumeService.PullInResume(this.name);
    console.log("Good Bye!");
  }


  // After resume is in, set up the data
  ngDoCheck(){
       console.log(this.sub);
       console.log(this.sub._subscriptions[0]);
       this.resumeService.SetupResume();
       
  }
  
  generateArray(obj){
   return Object.keys(obj).map((key)=>{ return obj[key]});
  }
  
  // Shows the positions based on the job title selection
  onClick(isValid: boolean, f: User) {
    console.log("Clicked");
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}	
