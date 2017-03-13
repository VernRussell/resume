import { Component, Input, OnInit, DoCheck, OnDestroy, SimpleChange, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormControl,  NgForm, NgModel, FormsModule, ReactiveFormsModule,
	FormGroup, 
	FormBuilder } from '@angular/forms'; 
import { ResumeService } from '../Services/resume.service';
import { SearchService } from '../Services/search.service';
import { Resume } from './classes/resume';
import { Position } from './classes/position'
import { ActivatedRoute } from '@angular/router';
import 'rxjs/Rx';

@Component({
	selector: 're-technology',
	templateUrl: './technology.component.html',
	styleUrls: ['../app.component.css']
})

export class TechnologyComponent implements OnInit, OnDestroy, DoCheck {

	private techChosen: string = "None";
	
	private category: string = "";
	
	name: string = "";
  private sub: any;

  @Output()
  select: EventEmitter<any>;

	constructor(private searchService:SearchService, private resumeService:ResumeService, private route: ActivatedRoute) {
		this.select = new EventEmitter();
	}
	
	// Start process of pulling in resume json file
	// Note: If app pulls in a partner component, this does nothing
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.name = params['name']; // (+) converts string 'id' to a number
    });
    this.resumeService.PullInResume(this.name);
  }

  // After resume is in, set up the data
  ngDoCheck(){
    this.resumeService.SetupResume();
  }
  
  setCategory(event){
        this.category = event.srcElement.innerText;
        console.log(this.category, this.resumeService.resume.technologyByCategory["SQL"]);
        console.log(this.resumeService.resume.technologyByCategory["SQL"].includes(this.category));
  }

  // Shows details of technology picked
  onTech(event) {
    if (this.resumeService.resume) {
      this.techChosen = event.srcElement.innerText;
      console.log("Tech:", this.techChosen);
      // I should be able to pull a summary off of an object in resume based on tech chosen
      // resume.resume.tasksByTech[tech] should have a summary value
  
      if (this.techChosen === "None"){
        this.resumeService.resume.techTasks = [];
      }
      else {
         this.resumeService.resume.techTasks = this.resumeService.resume.tasksByTech[this.techChosen].tasks;
         console.log(this.techChosen, this.resumeService.resume.tasksByTech[this.techChosen].skill);
         if (this.resumeService.resume.tasksByTech[this.techChosen].skill.summary) {
           this.resumeService.resume.skillSummary = this.resumeService.resume.tasksByTech[this.techChosen].skill.summary;
           console.log(this.resumeService.resume.tasksByTech[this.techChosen].skill.summary);
         }
      }
    }
  }
  
    ngOnDestroy() {
    this.sub.unsubscribe();
  }
}