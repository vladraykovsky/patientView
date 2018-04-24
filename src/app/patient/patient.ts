export class Patient {
  public patientId: number;
  public name: string;
  public surname: string;
  public dateOfBirth: string;
  public country: string;
  public state: string;
  public address: string;
  public sex: string;

  constructor( patientId: number , name: string ='', surname: string = '', dateOfBirth: string =' ',
               country: string =' ', state: string =' ', address: string = ' ', sex: string =' ' ) {
    this.patientId = patientId;
    this.name = name;
    this.surname = surname;
    this.dateOfBirth = dateOfBirth;
    this.country = country;
    this.state = state;
    this.address = address;
    this.sex = sex;
  }

}
