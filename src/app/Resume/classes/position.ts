export class Position {
  
  public duration: number;
  public year: number;
  public misc: number; 
   
  constructor (public id: number, public name: string, public dates: string, public vendor: string, 
  public client: string, public group: string, public city: string,
  public technologies: string[], public tasks: string[], public months: number[] ) {
    
    // Put code to extract from dates the number of months and the year the contract ended
  }
}

// 		"name": "Technical Lead",
// 		"Dates": "12/15-6/16",
// 		"Vendor": "HCL America",
// 		"Client": "Microsoft",
// 		"Group": "Bing Transit",
// 		"City": "Bellevue WA",
// 		"Technologies": ["SQL Server", "C#", ".Net", "PowerShell", "Azure", "Autopilot"],
// 		"Tasks": [
// 			"Automated the Bing Transit pipeline process taking agency routing and trip feeds, using SQL Server 2012/14, C#/.Net and PowerShell by restoring the backup of the feed data, applying fixes to bad data to generate clean data for pipeline which transforms the data into binary files read by the web site. by transforming the process from manual steps.",
// 			"Reduced feed data errors by 99%.",
// 			"Used SQL Azure to run tests and load data into a test environment on Azure virtual machine."
// 		]
		