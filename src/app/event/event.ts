export class Event {
  id: number;
  slug: string;
  title: string;
  //date: Date;
  date: string;
  time: any;		// {begin: XX, end: XX}
  place: string;
  budget: number;
  qtyPeople: any;	// {min: XX, max: XX}
  //restrictions: string;
  packageID: string = "";
}