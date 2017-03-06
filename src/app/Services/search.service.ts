import { Http, Response } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Resume } from '../Resume/classes/resume'
import { Position } from "../Resume/classes/position";
import { Technology } from "../Resume/classes/technology";
import { Education } from "../Resume/classes/education";

@Injectable()
export class SearchService {
  
  constructor(private http: Http) {}
  
  private resumePath: string = './app/JsonFiles/';
  private baseResumeName: string = 'Positions.json';

  private notFoundJson: Resume = new Resume( 0,	"Resume not found.",  new Array<Position>(),  new Array<Education>());
  
  private maps: Resume;
  
  mapsChanged = new EventEmitter<Resume>();

  // Pull the resume data into the object
  getResume() {
    console.log("Get Resume" + this.maps);
   return this.maps;
  }
  
  // Pull from Json and subscribe to the data
  fetchResume(name: string) {
     if (!name) name="default";
     var jsonName = this.resumePath + name + this.baseResumeName;
     console.log("Json path:" + jsonName);
     return this.http.get(jsonName)
            .map((response: Response) => response.json())
      .subscribe(
        (data: Resume) => {
          this.maps = data;
          this.mapsChanged.emit(this.maps);
          console.log( this.maps);
        },
        err => { console.log("Resume not found: " + err +  this.maps);
          this.maps = this.notFoundJson;
        },
        () =>  console.log("Done: " + this.maps)
      );
   }
}