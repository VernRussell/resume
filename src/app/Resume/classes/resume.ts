import {Input, DoCheck} from '@angular/core';
import { Position } from "./position";
import { Technology } from "./technology";
import { Education } from "./education";
import { Skill } from "./skill";

import 'rxjs/Rx';

export class Resume  {
   
    private myPosition: Position;
    // holds what tasks performed with the technology and shows number of months
    public tasksByTech: { [index: string]: Technology };
    
    public skillSummary: string;
    
    public technologies: { [category: string]: string[] };
    
    public technologyByCategory: { [technology: string]: string };
    
    public categories: string[];
    public showCats: boolean[];
    
    public educationSummary: string[];
    
    public techs: number;
    // list of technologies used on the resume
    public technologyList: string[];
    // list of job title first works used to filter positions
    public jobTitles: string[];
    // contains tasks held in tasksByTech that are shown on screen when requested
    
    public summary: string[];
    
    public techTasks: string[];
    public positionId: number;
    public skill: Skill[];
    
       constructor (public id: number, public name: string, public positions: Position[], public educations: Education[]) {
   }
   
    // So the app shows positions and job titles in the Position component
    // It shows technologies and associated tasks in the Technology component
    // I want to add a component that shows my summarized highlights
    // Somewhere I want to list All my techologies in reverse experience order
    // It would be nice to have a pretty home page
    // I want it to show my best skills and technolgies and if you hit a button it goes into more detail
    // I should have a page to show my training history
    // I want verbiage to orientate the user on how the site works
    // 1) My Positions 2) My Technologies 3) Fill in technologies in a list box, produce a report
    
    // Issues:
    // Some techologies do not fill the full position time, need sub totals
    // Need to handle training and knowledge, where there is not experience
    
    // Next step: Add the home page, putting my highlights in the Json file and pulling it in
    // I may want a 2nd Json file?
    
    // Added technologies and summary, they auto load as long as the same items are declared above exactly to the case
    
    // Now, I could add category to technology
    // However, to look it up faster, I should iterate through the technologies and pair it with a category
    
    // OK, they are now paired
    // Now when you populate with the technology object, add the column category, if the name of the technology being added
    // is in the master category list, insert category, otherwise substitue "None"
    
    // Resume this after time outside
    
    // Last night wrote code to parse text placed in a text box and provide a link to export to the local box
    // I want to capture words and phrases somewhere to be under consideration to use for this application
    // Most likely the better design, would be a secondary JSON file to hold this.
    
    // Home page
    // List my highlights, skills, and first three positions as is with the resume JSON file. 
    // First cut of the above is complete, need to pretty it up a bit
    
    // Plus an education summary, which will be added to resume
    
    // To do:
    // Add education to resume
    
    // OK, so I have added my education to the resume, and am showing it in the skills page
    
    // I need to take some time to pretty up the styles
    
    // Other issues: Marry up the skills listed in the front of the resume with the skills demonstrated with the positions
    
    // I specified the # months for each tech that did not span the job duration and implemented in the code
    // I added the code to show the #years if #months > 5, otherwise show the months
    
    // Now I need to merge the technologies and correct mis-spellings and correct tasks 
    
    // Syched all the technologies
    
    // Now want to only show categories marked to show
    // Fix code in Resume Services
    
    // Split out to show only those within the category
    
    // Put a list of technologies in a list box, or present an array of all the technologies, with the years of experience beside
    // check off the ones that apply, submit.
    // You will see a report listing my experiences
    
    // Add dummy resume for default site, make route work to provide the name of the resume JSON file.
    
    // Add page listing technologies and years of experience in a list or grid of buttons
    
    // So last night I styled most of the pages and cleaned up some of the verbiage.
    
    // Now I would like to figure out a default way to enter the application
    // If you begin with just the base URL, you get a dummy resume.
    // There is not an obvious way to switch to your resume or a way to reenter with your resume on the main route
    
    // Completed some cleanup
    // Todo: get (7) out of dates, style 
     

  

}