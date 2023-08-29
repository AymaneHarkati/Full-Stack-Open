import { Gender } from "./types";
import { patientType } from "./types";
const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(gender);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Gender entred are incorrect");
  }
  return gender;
};

export const toNewPatient = (object: any): patientType => {
  const newPatient: patientType = {
    ...object,
    gender: parseGender(object.gender),
  };

  return newPatient;
};
