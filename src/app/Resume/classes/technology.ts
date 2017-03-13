import { Skill } from "./skill";

export class Technology {
  
  public years: number;
  
  public category: string;
  
  public skill: Skill;
  
  constructor (public months: number, public tasks: string[] ) {
  }
}
