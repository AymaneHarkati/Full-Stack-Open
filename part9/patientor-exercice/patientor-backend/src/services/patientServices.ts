import { patientType } from "../types";
const patient: Array<patientType> = [
  {
    id: 1,
    name: "John McClane",
    dateOfBirth: "1986-07-09",
    gender: "male",
    occupation: "New york city cop",
  },
];

const getAll = (): Array<patientType> => {
  return patient;
};

const addPatient = (patientPassed: patientType) => {
  const newPatient = { ...patientPassed, id: Math.floor(Math.random() * 100) };
  patient.push(newPatient);
  return patient;
};

export default { getAll, addPatient };
