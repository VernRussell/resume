import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'; 
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { UnlessDirective } from "./Resume/classes/unless.directive";
import { PositionsComponent } from "./Resume/positions.component";
import { TechnologyComponent } from "./Resume/technology.component";
import { ResumeComponent } from "./Resume/resume.component";
import { SkillsComponent } from "./Resume/skills.component";
import { SearchService } from "./Services/search.service";
import { ResumeService } from "./Services/resume.service";
import { HeaderComponent } from "./header.component";
import { routing } from "./app.routing";
import { KeysPipe } from './Services/keys.pipe';
import { ValuesPipe } from './Services/values.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PositionsComponent,
    TechnologyComponent,
    ResumeComponent,
    SkillsComponent,
    KeysPipe,
    ValuesPipe,
    UnlessDirective
  ],
  imports: [
    BrowserModule, 
    ReactiveFormsModule, 
    FormsModule,
    HttpModule,
    RouterModule,
    routing
  ],
  providers: [SearchService, ResumeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
