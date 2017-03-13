import { Http, Response } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Resume } from '../Resume/classes/resume';
import { SearchService} from './search.service';
import { Technology } from '../Resume/classes/technology';
import { Skill } from '../Resume/classes/skill';

@Injectable()
export class ResumeService {
  
  public resume: Resume;
  public positionIndex: number;
  private mySkill: Skill;
  
  constructor(private searchService:SearchService) {}
  
  // Starts process to pull in my resume Json file via search service
    public PullInResume(name: string) {
        this.positionIndex = 0;
        if (!this.resume) {
            console.log("Resume Begin");
            this.searchService.fetchResume(name);
            console.log("Resume Refresh");
        }
    }
  
    // Checks for the arrival of the resume object
    // Once it arrives, loads in All of the data
    // and performs All pre-calculations required to render the pages
    public SetupResume(){
        console.log("Changed" + this.resume);
        if (this.resume === undefined){
           this.resume = this.searchService.getResume();
        }
        
        if (this.resume) {
            console.log(this.resume.name);
            this.resume.positionId = this.positionIndex;

            if (this.resume.summary){
                // console.log(this.resume.summary);
                this.resume.technologyByCategory = {};
                                
                for (var id in this.resume.technologies){
                    for (var category in this.resume.technologies[id]){
                    var techs = this.resume.technologies[id][category];
                    //  console.log(category, techs);
                     for (var t = 0; t < techs.length; t++){
                         this.resume.technologyByCategory[techs[t]] = category;
                     }
                    }
                }
                
                // console.log(this.resume.technologyByCategory);
            }
            
            if (!this.resume.technologyList){
                this.InitializeTechnogies();
            }
        }
        else {
            console.log("No resume retrieved yet!");
        }
    }
    
   // Set up the technology information
   private InitializeTechnogies(){
        console.log("hello" + this.resume.positions.length);

       // Initialize properties in Resume object
       this.resume.technologyList = [];
       this.resume.jobTitles = [];
       this.resume.techTasks = [];
       this.resume.techs = 0;
       this.resume.positionId = -1;
       this.resume.tasksByTech = {};
       var firstTitle: string[] = [];    
       
       // Initialize the technology list and job titles
       this.resume.technologyList.push("None");
       this.resume.jobTitles.push("Recent");
       for (var t in this.resume.technologies) {
           for (var x in this.resume.technologies[t]){
               for(var z=0; z< this.resume.technologies[t][x].length; z++){
                // console.log(x, this.resume.technologies[t][x][z]);
               }
           }
       }

       
       // Walk through the resume data and build the above two objects
       for (var pos=0; pos < this.resume.positions.length; pos++){
        var newName = this.resume.positions[pos].name.replace(/\//g, " ").split(' ')[0];
        
        this.SetYear(pos);
        var techs = this.resume.positions[pos].technologies;
        var months = this.resume.positions[pos].duration;
        
        // Go through technologies, add new to list, accumulate number of months for each technology
        if (techs) {
          for (var id=0; id < techs.length; id++ ){
             var tech = techs[id];
             for (var s in this.resume.skill){
                 this.mySkill = this.resume.skill[s];
                   if (this.mySkill && this.mySkill.name === tech  && this.mySkill.summary){
                      break;
                  }
             }
             
             var techMonths = this.resume.positions[pos].months[id];
             if (techMonths < 0) techMonths = months;
        
             if (this.resume.technologyList.indexOf(tech) < 0){
                this.resume.technologyList.push(tech);
                console.log(tech, techMonths, this.mySkill);
                this.addTechnology(tech, techMonths, this.mySkill);
              }
              else {
                //   console.log(this.resume.tasksByTech[tech].months, tech, months);
                  this.resume.tasksByTech[tech].months += months;
              }
              
              techs[id] = " [" + techs[id] + "]";
          }
          
          this.resume.positions[pos].technologies = techs;
        }
        
        
       if (this.resume.jobTitles.indexOf(newName) < 0){
           if (firstTitle.indexOf(newName) < 0){
               firstTitle.push(newName);
           }
           else {
               this.resume.jobTitles.push(newName);
           }
       }
      }
      
      
     for (var pos=0; pos < this.resume.positions.length; pos++){
        var newName = this.resume.positions[pos].name.replace(/\//g, " ").split(' ')[0];
    
        if (this.resume.jobTitles.indexOf(newName) < 0  && firstTitle.indexOf(newName) > -1){
            this.resume.positions[pos].misc = 1;
        }
     }
     
     this.resume.jobTitles.push("Misc");
       
     // Reprocess loop - to fill in the calculated year
     for (tech in this.resume.tasksByTech){
         for(var i=0; i < this.resume.tasksByTech[tech].tasks.length; i++){
             var pos = Number(this.resume.tasksByTech[tech].tasks[i].split('~')[1]);
             this.resume.tasksByTech[tech].tasks[i] = this.resume.tasksByTech[tech].tasks[i].split('~')[0].replace('|', this.resume.positions[pos].year.toString());
         }
         
         this.resume.tasksByTech[tech].years = 0;
         
         if (this.resume.tasksByTech[tech].months > 5) {
             this.resume.tasksByTech[tech].years = Math.ceil(this.resume.tasksByTech[tech].months / 12);
         }
         
         if (tech in this.resume.technologyByCategory){
             this.resume.tasksByTech[tech].category = this.resume.technologyByCategory[tech];
         }
         
         if (this.resume.tasksByTech[tech].tasks.length < 2)
         console.log(tech, this.resume.tasksByTech[tech].months, this.resume.tasksByTech[tech].years, this.resume.tasksByTech[tech].category,
           this.resume.tasksByTech[tech].tasks.length, "Tasks" );
     }
   }
   
   // Set the year and months position lasted based on the MM/YY-MM/YY format
   private SetYear(pos: number){
        var abc = this.resume.positions[pos].dates.replace('-','/').split('\/');
        var year = Number(abc[3]) + 1900;
        if (year < 1950) year += 100;
        this.resume.positions[pos].year = year;

        var year1 = Number(abc[1]) + 1900;
        if (year1 < 1950) year1 += 100;
        
        this.resume.positions[pos].duration = 12*(year - year1) + Number(abc[2]) - Number(abc[0]) + 1;
    }
   
   // For each technology, go through All the tasks and include when the task involves the technology
   // Fill in the technology object, using the number of months for the first position that involves that technology
   private addTechnology(tech: string, months: number, skill: Skill){
    
    var taskList: string[] = [];
    
    for (var pos=0; pos < this.resume.positions.length; pos++){
         for(var id = 0; id < this.resume.positions[pos].tasks.length; id++){
           var task = this.resume.positions[pos].tasks[id];
           if (task.includes(tech)){
             taskList.push(task + ' ' + this.resume.positions[pos].client + ' (|)~' + this.resume.positions[pos].id);
          }
        }
    }   
    
    var technology = new Technology(months, taskList);
    technology.skill = skill;
    console.log(technology);
    this.resume.tasksByTech[tech] = technology;
    this.resume.techs++;
  }
}