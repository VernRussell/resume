import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl,  NgForm, NgModel } from '@angular/forms'; 
import { ResumeService } from '../Services/resume.service';
import { Resume } from './classes/resume';
import { Position } from './classes/position';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/Rx';

@Component({
	selector: 're-positions',
	templateUrl: './positions.component.html',
	styleUrls: ['../app.component.css']
})

export class PositionsComponent {
	private result; 
	private choice: string = "Recent";
	private showing: string = "";
	private techChosen: string = "None";
	private picked: string;
	private entries: number;

  private myPosition: Position;

  @Output()
  select: EventEmitter<any>;

	constructor(private resumeService:ResumeService, private route: ActivatedRoute) {
		this.select = new EventEmitter();
	}
	
  // Shows the positions based on the job title selection
  onClick(event) {
    this.choice = event.srcElement.innerText;
    this.showing = "";
  }
  
  // Shows the details of the chosen position
  onPick(event) {
    this.showing = "Showing";
    this.myPosition = this.resumeService.resume.positions[Number(event.srcElement.attributes.id.nodeValue)]; 
  }
}	
