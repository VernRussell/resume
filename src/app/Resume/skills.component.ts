import { Component, Input, OnInit, SimpleChange, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormControl,  NgForm, NgModel, FormsModule, ReactiveFormsModule,
	FormGroup, 
	FormBuilder } from '@angular/forms'; 
import { ResumeService } from '../Services/resume.service';
import { Resume } from './classes/resume';
import { User } from './classes/user.interface';
import { Education } from './classes/education';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/Rx';

@Component({
	selector: 're-skills',
	templateUrl: './skills.component.html',
	styleUrls: ['../app.component.css']
})

export class SkillsComponent implements OnInit {
	searchField: FormControl;
	coolForm: FormGroup;
	public user: User;
	public wordList: string[] = [];

  @Output()
  select: EventEmitter<any>;
  
  constructor(private resumeService:ResumeService, private fb:FormBuilder, private route: ActivatedRoute) {
		this.searchField = new FormControl();
		this.coolForm = fb.group({search: this.searchField});
		this.select = new EventEmitter();
	}
	
  ngOnInit() {
    this.user = {
      name: ''
    }
  }

  // Shows the positions based on the job title selection
  onClick(isValid: boolean, f: User) {
    console.log("Clicked");
    if (!isValid) return;
    var words = f.name.split(' ');
    var size = 2;
    
    for (var i=0; i < words.length; i++){
      var toPut = words[i];
      for (var j = i + 1; j < words.length && j < i + size; j++){
           if (this.wordList.indexOf(toPut) < 0 && toPut === toPut.toUpperCase()){
             this.wordList.push(toPut);
           }
           if (j + 1 < words.length && words[j] === words[j].toUpperCase()){
            var ucWord = words[j].toUpperCase();
            var word = words[j];
            console.log(ucWord === word, word);
            toPut += ' ' + words[j].toUpperCase();
           }
      }
    }
    
    var theJSON = JSON.stringify(this.wordList);
    var uri = "data:application/json;charset=UTF-8," + encodeURIComponent(theJSON);
    
    var a = document.createElement('a');
    a.href = uri;
    a.innerHTML = "Right-click and choose 'save as...'";
    document.body.appendChild(a);
  }

}	
