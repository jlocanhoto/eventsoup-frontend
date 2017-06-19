export class Event {
  id: number;
  slug: string;
  title: string;
  //date: Date;
  date: string;
  time: any;		// {begin: XX, end: XX}
  place: string;
  budget: number;
  qtdPeople: any;	// {min: XX, max: XX}
  //restrictions: string;
  packageID: string = "";
  bairro      : string = "";
  rua        : string = "";
  numero      : number =  0;
}