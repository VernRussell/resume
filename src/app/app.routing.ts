import { RouterModule, Routes } from '@angular/router';

import { PositionsComponent } from "./Resume/positions.component";
import { TechnologyComponent } from "./Resume/technology.component";
import { ResumeComponent } from "./Resume/resume.component";
import { SkillsComponent } from "./Resume/skills.component";

const APP_ROUTES: Routes = [
  {path: '', component: ResumeComponent, pathMatch: 'full'},
  {path: 'resume/:name', component: ResumeComponent},
  {path: 'positions', component: PositionsComponent},
  {path: 'technology', component: TechnologyComponent},
  {path: 'skills', component: SkillsComponent},
  {path: ':name', component: ResumeComponent}
];

// export the router module with these routes added to it
export const routing = RouterModule.forRoot(APP_ROUTES);