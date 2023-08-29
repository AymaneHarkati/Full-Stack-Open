export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}
export interface patientType {
  id: number;
  name: string;
  dateOfBirth: string;
  gender: string;
  occupation: string;
}
